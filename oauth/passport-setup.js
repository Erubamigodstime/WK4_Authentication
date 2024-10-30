const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv')
const Profile = require('../model/profile')
dotenv.config()



passport.serializeUser((profile, cb) => {
    cb(null, profile.id)
})

passport.deserializeUser((id, cb) => {
    Profile.findById(id)
        .then((profile) => {
            cb(null, profile);
        })
        .catch((err) => {
            cb(err, null);
        });
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL 
},
(accessToken, refreshToken, profile, cb) => {
    Profile.findOne({ googleId: profile.id })
        .then(existingProfile => {
            if (existingProfile) {
                return cb(null, existingProfile);
            } else {
                
                const newProfile = new Profile({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });
                newProfile.save().then(profile => cb(null, profile));
            }
        })
        .catch(err => {
            return cb(err, null);
        });
}));





