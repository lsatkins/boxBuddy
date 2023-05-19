sequelize model:generate --name users --attributes firstName:string,lastName:string,email:string,password:string,imageURL:string,bio:string

sequelize model:generate --name friends --attributes userID:integer,friendID:integer

sequelize model:generate --name exercises --attributes name:string,type:string,muscle:string,equipment:string,instructions:string

sequelize model:generate --name userPRs --attributes exerciseID:integer,reps:integer,weight:integer,userID:integer,minutes:integer,seconds:integer,distance:integer,calories:integer

sequelize model:generate --name posts --attributes exerciseID:integer,sets:integer,reps:integer,weight:integer,userID:integer,minutes:integer,seconds:integer,distance:integer,calories:integer,notes:text

sequelize model:generate --name comments --attributes postID:integer,userID:integer,description:text

sequelize model:generate --name likes --attributes postID:integer,userID:integer