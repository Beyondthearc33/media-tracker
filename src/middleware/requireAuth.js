/* ********************************
 *  middleware/requireAuth.js
 * ******************************* */
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please log in first',
    });
  }
  // User authenticated
  next();
};

module.exports = requireAuth;
