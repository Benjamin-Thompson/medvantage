SET SQL_SAFE_UPDATES=0;
use medvantage;
DROP TABLE IF EXISTS ActiveReports;
CREATE TABLE IF NOT EXISTS ActiveReports (
	ID int NOT NULL AUTO_INCREMENT,
	UPLOAD_MONTH int NULL,
    UPLOAD_YEAR int NULL,
    isACTIVE boolean NULL,
    
    CREATED_DATE date NOT NULL,
    CREATED_BY int NOT NULL,
    MODIFIED_DATE date NOT NULL,
    MODIFIED_BY int NOT NULL,
    primary key(ID)
);

ALTER TABLE ActiveReports   
    add constraint
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    

DROP TABLE IF EXISTS BDS;
CREATE TABLE IF NOT EXISTS BDS (
	ID int NOT NULL AUTO_INCREMENT,
    FACILITY_ID int NULL,
    PATIENT_FIRST_NAME varchar(255) NULL,
    PATIENT_LAST_NAME varchar(255) NULL,
    DATE_OF_SERVICE date NULL,
    SCAN_DATE Date NULL,
    IF_OR_HOME varchar(5) NULL,
    INSURANCE_COMPANY varchar(255) NULL,
    MAPPED_TO int NULL,
    
    CREATED_DATE date NOT NULL,
    CREATED_BY int NOT NULL,
    MODIFIED_DATE date NOT NULL,
    MODIFIED_BY int NOT NULL,
    primary key(ID)
);

ALTER TABLE BDS 
    add constraint
    foreign key(FACILITY_ID) references Facilities(ID),
    add constraint
    foreign key(MAPPED_TO) references PaidBDS(ID),    
    add constraint
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);

-- DROP PROCEDURE UpdateActiveReports
DELIMITER $$
CREATE PROCEDURE UpdateActiveReports(VAR_UPLOAD_MONTH int, VAR_UPLOAD_YEAR int, VAR_CURRENT_USER int, FORCE_VALUE boolean) 
BEGIN
	SET @isActive = (SELECT isACTIVE FROM ActiveReports WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR);
    IF @isActive IS NULL OR @isActive = FALSE THEN
		INSERT INTO ActiveReports (UPLOAD_MONTH, UPLOAD_YEAR, isACTIVE, CREATED_DATE, CREATED_BY, MODIFIED_DATE, MODIFIED_BY)
        VALUES (VAR_UPLOAD_MONTH, VAR_UPLOAD_YEAR, FORCE_VALUE, CURDATE(), VAR_CURRENT_USER, CURDATE(), VAR_CURRENT_USER);
	ELSE 
		UPDATE ActiveReports
		SET isActive = FORCE_VALUE, MODIFIED_DATE = CURDATE(), MODIFIED_BY = VAR_CURRENT_USER
		WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR;
    END IF;
    
    SELECT isACTIVE FROM ActiveReports WHERE UPLOAD_MONTH = VAR_UPLOAD_MONTH AND UPLOAD_YEAR = VAR_UPLOAD_YEAR;
END$$


CREATE PROCEDURE  GET_BDS_TABLE(VAR_LIMIT int, VAR_OFFSET int) 
BEGIN
	SET @COUNTBDS = (SELECT COUNT(*) as BDSCOUNT FROM BDS);
    SET @PAGECOUNT = (SELECT 
						CASE WHEN VAR_LIMIT > @COUNTBDS 
                        THEN 1 ELSE 
                        CAST(@COUNTBDS/VAR_LIMT AS UNSIGNED)
                        END);
	SET @STARTAT = (SELECT VAR_LIMIT * VAR_OFFSET);

    SELECT * FROM (
    SELECT @r := @r + 1 as ROW_NUMBER, p.* FROM (
    SELECT 
		a.ID,
        a.FACILITY_ID,
        b.TITLE as FACILITY_NAME,
        a.REP_ID,
        c.TITLE as REP_NAME,
        a.PATIENT_FIRST_NAME,
        a.PATIENT_LAST_NAME,
        a.DATE_OF_SERVICE,
        a.SCAN_DATE,
        a.IF_OR_HOME,
        a.INSURANCE_COMPANY,
        a.CREATED_DATE,
		d.TITLE as CREATED_BY,
        a.MODIFIED_DATE,
        e.TITLE as MODIFIED_BY
        FROM BDS a
        LEFT JOIN Facilities b ON a.FACILITY_ID = b.ID
        LEFT JOIN Reps c ON b.REP_ID = c.ID
        LEFT JOIN Users d ON a.CREATED_BY = d.ID
        LEFT JOIN Users e ON a.MODIFIED_BY = e.ID
        ORDER BY a.MODIFIED_DATE desc) p, (SELECT @r := 0) r) p1
	WHERE ROW_NUMBER >= @STARTAT
    LIMIT VAR_LIMIT;
END$$

CREATE PROCEDURE  GET_BDS_UNMAPPED(VAR_LIMIT int, VAR_OFFSET int) 
BEGIN
	SET @COUNTBDS = (SELECT COUNT(*) as BDSCOUNT FROM BDS WHERE MAPPED_TO IS NULL);
    SET @PAGECOUNT = (SELECT 
						CASE WHEN VAR_LIMIT > @COUNTBDS 
                        THEN 1 ELSE 
                        CAST(@COUNTBDS/VAR_LIMT AS UNSIGNED)
                        END);
	SET @STARTAT = (SELECT VAR_LIMIT * VAR_OFFSET);

    SELECT * FROM (
    SELECT @r := @r + 1 as ROW_NUMBER, p.* FROM (
    SELECT 
		a.ID,
        a.FACILITY_ID,
        b.TITLE as FACILITY_NAME,
        a.REP_ID,
        c.TITLE as REP_NAME,
        a.PATIENT_FIRST_NAME,
        a.PATIENT_LAST_NAME,
        a.DATE_OF_SERVICE,
        a.SCAN_DATE,
        a.IF_OR_HOME,
        a.INSURANCE_COMPANY,
        a.CREATED_DATE,
		d.TITLE as CREATED_BY,
        a.MODIFIED_DATE,
        e.TITLE as MODIFIED_BY
        FROM BDS a
        LEFT JOIN Facilities b ON a.FACILITY_ID = b.ID
        LEFT JOIN Reps c ON b.REP_ID = c.ID
        LEFT JOIN Users d ON a.CREATED_BY = d.ID
        LEFT JOIN Users e ON a.MODIFIED_BY = e.ID
        WHERE a.MAPPED_TO IS NULL
        ORDER BY a.MODIFIED_DATE desc) p, (SELECT @r := 0) r) p1
	WHERE ROW_NUMBER >= @STARTAT
    LIMIT VAR_LIMIT;
END$$

CREATE PROCEDURE  GET_BDS_MAPPED(VAR_LIMIT int, VAR_OFFSET int) 
BEGIN
	SET @COUNTBDS = (SELECT COUNT(*) as BDSCOUNT FROM BDS WHERE MAPPED_TO IS NOT NULL);
    SET @PAGECOUNT = (SELECT 
						CASE WHEN VAR_LIMIT > @COUNTBDS 
                        THEN 1 ELSE 
                        CAST(@COUNTBDS/VAR_LIMT AS UNSIGNED)
                        END);
	SET @STARTAT = (SELECT VAR_LIMIT * VAR_OFFSET);

    SELECT * FROM (
    SELECT @r := @r + 1 as ROW_NUMBER, p.* FROM (
    SELECT 
		a.ID,
        a.FACILITY_ID,
        b.TITLE as FACILITY_NAME,
        a.REP_ID,
        c.TITLE as REP_NAME,
        a.PATIENT_FIRST_NAME,
        a.PATIENT_LAST_NAME,
        a.DATE_OF_SERVICE,
        a.SCAN_DATE,
        a.IF_OR_HOME_INSURANCE,
        a.INSURANCE_COMPANY,
        a.CREATED_DATE,
		d.TITLE as CREATED_BY,
        a.MODIFIED_DATE,
        e.TITLE as MODIFIED_BY
        FROM BDS a
        LEFT JOIN Facilities b ON a.FACILITY_ID = b.ID
        LEFT JOIN Reps c ON b.REP_ID = c.ID
        LEFT JOIN Users d ON a.CREATED_BY = d.ID
        LEFT JOIN Users e ON a.MODIFIED_BY = e.ID
        WHERE a.MAPPED_TO IS NOT NULL
        ORDER BY a.MODIFIED_DATE desc) p, (SELECT @r := 0) r) p1
	WHERE ROW_NUMBER >= @STARTAT
    LIMIT VAR_LIMIT;
END$$

CREATE PROCEDURE GET_BDS_DELAYED() 
BEGIN
    SELECT 
        a.ID as FACILITY_ID,
        a.TITLE as FACILITY_NAME,
        a.REP_ID,
        c.TITLE as REP_NAME,
        MAX(b.DATE_OF_SERVICE) as LastDOS
        FROM Facilities a
        LEFT JOIN BDS b ON a.ID = b.FACILITY_ID
        LEFT JOIN Reps c ON a.REP_ID = c.ID
	GROUP BY 
		a.ID,
        a.TITLE,
        a.REP_ID,
        c.TITLE
	HAVING LastDOS < DATE_SUB(CURDATE(), INTERVAL 30 DAY);
END$$
DELIMITER ; 



