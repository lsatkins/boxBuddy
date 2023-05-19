
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const db = require('../models'); 


const init = (passport) => {

    console.log(`before passport.use is called`);
    
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {

        console.log(`User is logged in.`);
        // scraped info from header
        // check if user is in database
        // grab current encrypted password
        // create a new encrypted password based on what they just used to log in
        // make comparison between the two
        
        try{
            console.log(`entering try statement`);
            let records = await db.users.findAll({
                where: {email}
            }) // arr of record of that email

            // if record was found
            if(records){

                console.log(`A record was found in database for this user`);
                let record = records[0];

                // get db pw and compare it to pw entry in form
                bcrypt.compare(password, record.password, (err, match) => {
                    
                    if(match){
                        // passwords match
                        console.log(`passwords match`);
                        return done(null, record)
                        // done() is our next() => move to next in chain 
                    }
                    else {
                        // no match
                        console.log(`passwords didn't match`);
                        return done(null, false)
                    }
                })

            }
            else {
                // no record found from db query
                console.log(`No record was found.`);
                return done(null, false)
            }
        }
        catch(err){
            console.log(`there was an error in try block`);
            console.log(err);
            return done(err);
        }

    })) // -------- end of passport local ----------

    // add the user info to the session
    // user is going to come from the record passed from the done above
    // what are we putting on the session?

    //? info is passed from successful done(): ^record
    passport.serializeUser((user, done) => {
        console.log(`session inside serialized user`);
        done(null, user.id) //2nd argument is what goes on the session.id
    })

    // grabs the session & decodes the secret

    // checks primary key & goes to routes in relation to that info    
    passport.deserializeUser(async (id, done) => {
        try{
            console.log(`session inside deserialize user`);

            let foundUserInDBFromSessionID = await db.users.findByPk(id);

            if(foundUserInDBFromSessionID){
                // we found userID in db
                console.log(`found userID (${id}) in deserialized database `);
                done(null, foundUserInDBFromSessionID)
                // gives us access to everything in record
            }
            else {
                console.log(`id was not found in db for deserializing`);
                // id was not found in db
                done(null, false)
            }
        }
        catch(error){
            done(error, false)
        }
    })

} // end of function


module.exports = init