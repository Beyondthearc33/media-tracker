/* ********************************
 *  controllers/authController.js
 * ******************************** */
// Import Passport Library
const passport = require('passport');

// Starts the GitHub OAuth login flow
const login = passport.authenticate('github', { scope: ['user:email'] });

// Handles the OAuth callback from GitHub
const callback = [
  passport.authenticate('github', {
    failureRedirect: '/login-failed',
    session: true,
  }),
  (req, res) => {
    res.status(200).json({
      message: 'Authentication successful',
      user: req.user,
    });
  },
];

//  Returns the currently authenticated user
const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'User not authenticated',
    });
  }

  res.status(200).json({
    message: 'Authenticated user',
    user: req.user,
  });
};

// Logs out the current user and destroys the session
const logout = (req, res, next) => {
  // Passport logout (removes req.user)
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    if (!req.session) {
      return res.status(200).json({
        message: 'Logged out successfully (no active session)',
      });
    }

    // Destroy session on server
    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

    // Clear session cookie from brwoser
    res.clearCookie('connect.sid', {
        path: '/',
      });

      return res.status(200).json({
        message: 'Logged out successfully',
      });
    });
  });
};

module.exports = {
  login,
  callback,
  getCurrentUser,
  logout,
};
