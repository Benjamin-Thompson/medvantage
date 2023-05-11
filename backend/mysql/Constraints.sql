		SELECT DISTINCT
			a.BILLER_ID,
			c.TITLE as FACILITY_NAME,
			b.FACILITY_ID,
			a.FACILITY_NAME as RAW_FACILITY_NAME,
			a.UPLOAD_MONTH,
			a.UPLOAD_YEAR,
			e.TITLE as BILLER_NAME
		FROM PaidBDSStaging a 
		LEFT JOIN Facilities_Map b ON UPPER(a.FACILITY_NAME) = UPPER(b.UGLY_FACILITY) 
		LEFT JOIN Facilities c ON b.FACILITY_ID = c.ID
		LEFT JOIN Billers e ON a.BILLER_ID = e.ID
		WHERE b.FACILITY_ID IS NULL;
        
        
        CALL LOADTODATABASE(4, 5, 2017)
        
        
SELECT * FROM Facilities_Map

INSERT INTO Facilities_Map (UGLY_FACILITY, FACILITY_ID)
VALUES ("CAMeron",2) ON DUPLICATE KEY UPDATE    
FACILITY_ID = 19
	
    
DROP PROCEDURE LOADDASHBOARD;
SET SQL_SAFE_UPDATES=0;
DELIMITER $$    
CREATE PROCEDURE LOADDASHBOARD(VAR_UPLOAD_MONTH INT, VAR_UPLOAD_YEAR INT, ACTIVE_STATUS BOOLEAN)
BEGIN


	CREATE TEMPORARY TABLE IF NOT EXISTS PAIDTABLE AS 
	SELECT b.REP_ID, SUM(a.PAID_AMOUNT) as PAID_AMOUNT
	FROM PaidBDS a LEFT JOIN Facilities_To_Rep b ON a.FACILITY_ID = b.FACILITY_ID
	WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR
    GROUP BY b.REP_ID;
  
    CREATE TEMPORARY TABLE IF NOT EXISTS COGTABLE AS 
	SELECT b.REP_ID, SUM(AMOUNT) as COG_AMOUNT
	FROM Cogs a LEFT JOIN Facilities_To_Rep b ON a.FACILITY_ID = b.FACILITY_ID
	WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR 
    GROUP BY b.REP_ID;
    
    CREATE TEMPORARY TABLE IF NOT EXISTS FULLCOMMISSION AS 
    SELECT * FROM (
		SELECT REP_ID, FACILITY_ID, SUM((PAID_AMOUNT - COG_AMOUNT) * TRUECOMMISSION) as COMMISSION, 
        COMMISSIONTYPE,  MAX(VAR_UPLOAD_MONTH) as UPLOAD_MONTH,  MAX(VAR_UPLOAD_YEAR) as UPLOAD_YEAR FROM (
			SELECT a.*, b.TRUECOMMISSION FROM (
					SELECT REP_ID, FACILITY_ID, COMMISSIONTYPE, SUM(PAID_AMOUNT) as PAID_AMOUNT, SUM(COG_AMOUNT) as COG_AMOUNT FROM (
						SELECT b.REP_ID, a.FACILITY_ID, a.PAID_AMOUNT, 0 as COG_AMOUNT, b.COMMISSIONTYPE
						FROM PaidBDS a LEFT JOIN Facilities_To_Rep b ON a.FACILITY_ID = b.FACILITY_ID
						WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR
						UNION ALL
						SELECT b.REP_ID, a.FACILITY_ID, 0 as PAID_AMOUNT, AMOUNT as COG_AMOUNT, b.COMMISSIONTYPE
						FROM Cogs a LEFT JOIN Facilities_To_Rep b ON a.FACILITY_ID = b.FACILITY_ID
						WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR) a
					GROUP BY REP_ID, FACILITY_ID, COMMISSIONTYPE
				) a LEFT JOIN Facilities_To_Rep b ON a.REP_ID = b.REP_ID AND a.FACILITY_ID = b.FACILITY_ID) e
		GROUP BY REP_ID, FACILITY_ID, COMMISSIONTYPE) m
    WHERE REP_ID IS NOT NULL;
    	
    CREATE TEMPORARY TABLE IF NOT EXISTS MANUALCOMMISSION AS 
    SELECT REP_ID, SUM(AMOUNT) as AMOUNT, 'MANUAL' as TYPECOMM,  
    VAR_UPLOAD_MONTH as UPLOAD_MONTH, VAR_UPLOAD_YEAR as UPLOAD_YEAR 
    FROM Manual_Overrides
    WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR
    GROUP BY REP_ID, TYPECOMM,UPLOAD_MONTH, UPLOAD_YEAR;
    
    CREATE TEMPORARY TABLE IF NOT EXISTS OVERRIDETABLE AS
	SELECT REP_ID, 0 as PAID_TOTAL, 0 AS COG_TOTAL, 
	0 AS GENERAL_COMMISSIONS, COMMISSION AS OVERRIDE_COMMISSIONS, 0 AS MANUAL_COMMISSIONS
	FROM FULLCOMMISSION  WHERE COMMISSIONTYPE = 'OVERRIDE';   
       
    DELETE FROM COMMISSION_TABLE WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR;
    INSERT INTO COMMISSION_TABLE (REP_ID, PAID_TOTAL, COG_TOTAL, GENERAL_COMMISSIONS,	OVERRIDE_COMMISSIONS, MANUAL_COMMISSIONS, UPLOAD_MONTH, UPLOAD_YEAR, REP_NAME, ISACTIVE)
    SELECT a.*, VAR_UPLOAD_MONTH as UPM, VAR_UPLOAD_YEAR as UPY, b.TITLE as REP_NAME, ACTIVE_STATUS as ISACTIVE FROM (
		SELECT REP_ID, 
		SUM(PAID_TOTAL) as PAID_TOTAL,
		SUM(COG_TOTAL) as COG_TOTAL,
		SUM(GENERAL_COMMISSIONS) as GENERAL_COMMISSIONS,
		SUM(OVERRIDE_COMMISSIONS) as OVERRIDE_COMMISSIONS,
		SUM(MANUAL_COMMISSIONS) as MANUAL_COMMISSIONS
		FROM (
		SELECT REP_ID, PAID_AMOUNT as PAID_TOTAL, 0 AS COG_TOTAL, 
		0 AS GENERAL_COMMISSIONS, 0 AS OVERRIDE_COMMISSIONS, 0 AS MANUAL_COMMISSIONS
		FROM PAIDTABLE
		UNION ALL
		SELECT REP_ID, 0 as PAID_TOTAL, COG_AMOUNT AS COG_TOTAL, 
		0 AS GENERAL_COMMISSIONS, 0 AS OVERRIDE_COMMISSIONS, 0 AS MANUAL_COMMISSIONS
		FROM COGTABLE    
		UNION ALL
		SELECT REP_ID, 0 as PAID_TOTAL, 0 AS COG_TOTAL, 
		COMMISSION AS GENERAL_COMMISSIONS, 0 AS OVERRIDE_COMMISSIONS, 0 AS MANUAL_COMMISSIONS
		FROM FULLCOMMISSION  WHERE COMMISSIONTYPE = 'GENERAL'    
		UNION ALL
		SELECT * FROM OVERRIDETABLE 
		UNION ALL
		SELECT REP_ID, 0 as PAID_TOTAL, 0 AS COG_TOTAL, 
		AMOUNT AS GENERAL_COMMISSIONS, 0 AS OVERRIDE_COMMISSIONS, AMOUNT AS MANUAL_COMMISSIONS
		FROM MANUALCOMMISSION) a
        WHERE REP_ID IS NOT NULL
		GROUP BY REP_ID) a 
	LEFT JOIN Reps b ON a.REP_ID = b.ID;
    
    SELECT ISACTIVE FROM COMMISSION_TABLE
    WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR
    LIMIT 1;
END$$
DELIMITER ;
CALL LOADDASHBOARD(0,5,2017);