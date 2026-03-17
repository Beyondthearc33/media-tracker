/* ********************************
 *  config/passport.js
 * ******************************** */
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

if (
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET ||
  !process.env.GITHUB_CALLBACK_URL
) {
  throw new Error('Missing GitHub OAuth environment variables');
}

// Register the GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    // Verify callback
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = await User.create({
            githubId: profile.id,

            username: profile.username || profile.displayName || 'GitHub User',

            name: profile.displayName || profile.username || 'GitHub User',

            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : null,

            avatarUrl:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : null,
          });
        }

        // When login succeeds
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

// serializeUser - what gets stored in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializeUser - Passport reads saved user ID from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
