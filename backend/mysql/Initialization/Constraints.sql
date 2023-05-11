-- Foriegn Keys
SET SQL_SAFE_UPDATES=0;
ALTER TABLE PaidBDS 
	add constraint
    foreign key(REP_ID) references Reps(ID),
    add constraint
    foreign key(FACILITY_ID) references Facilities(ID),
    add constraint
    foreign key(BILLER_ID) references Billers(ID),
    add constraint
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    
ALTER TABLE Cogs 
	add constraint   
    foreign key(REP_ID) references Reps(ID),
    add constraint
    foreign key(FACILITY_ID) references Facilities(ID),
    add constraint
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);  
    
ALTER TABLE Facilities 
	add constraint   
    foreign key(REP_ID) references Reps(ID),    
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    
ALTER TABLE Reps     
	add constraint   
    foreign key(PARENT_USER) references Users(ID),
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);  
    
ALTER TABLE Users     
	add constraint   
    foreign key (REP_ID) REFERENCES Reps(ID),
	add constraint   
    foreign key(PARENT_USER) references Users(ID);
    
ALTER TABLE Billers     
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    
ALTER TABLE Biller_Column_Mapping    
	add constraint   
    foreign key(BILLER_ID) references Billers(ID),    
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    
ALTER TABLE Special_Commissions  
	add constraint   
    foreign key (REP_ID) REFERENCES Reps(ID),
	add constraint   
    foreign key(PARENT_USER) references Users(ID),    
	add constraint   
    foreign key(FACILITY_ID) references Facilities(ID),    
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    
ALTER TABLE Special_Facility_Overrides     
	add constraint   
    foreign key (REP_ID) REFERENCES Reps(ID),
	add constraint   
    foreign key(PARENT_USER) references Users(ID),    
	add constraint   
    foreign key(FACILITY_ID) references Facilities(ID),    
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    
ALTER TABLE Special_Rep_Overrides     
	add constraint   
    foreign key(PARENT_REP_ID) references Reps(ID),
	add constraint   
    foreign key(PARENT_USER) references Users(ID),    
	add constraint   
    foreign key(CHILD_REP_ID) references Reps(ID),   
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);    
           
    
ALTER TABLE Manual_Overrides     
	add constraint   
    foreign key (REP_ID) REFERENCES Reps(ID),  
	add constraint   
    foreign key(PARENT_USER) references Users(ID),    
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);    
    
ALTER TABLE Report_Notes     
	add constraint   
    foreign key (REP_ID) REFERENCES Reps(ID),   
	add constraint   
    foreign key(PARENT_USER) references Users(ID),    
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID); 
    
ALTER TABLE Report_Messages    
	add constraint   
    foreign key(MESSAGE_FROM) references Users(ID),  
	add constraint   
    foreign key(MESSAGE_TO) references Users(ID),    
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);  
    
ALTER TABLE Bugs       
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID); 
    
ALTER TABLE Bug_Notes    
	add constraint   
    foreign key (BUG_ID) REFERENCES Bugs(ID),   
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);    


ALTER TABLE Updates     
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    
ALTER TABLE Notifications     
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);
    
ALTER TABLE User_Logs     
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);

    
ALTER TABLE Facilities_Rep_Map     
	add constraint   
    foreign key (REP_ID) REFERENCES Reps(ID),
	add constraint   
    foreign key(FACILITY_ID) references Facilities(ID),    
	add constraint   
    foreign key(CREATED_BY) references Users(ID),
    add constraint
    foreign key(MODIFIED_BY) references Users(ID);