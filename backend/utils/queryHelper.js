const mongoose = require('mongoose');

/**
 * Creates a database filter based on the logged-in user.
 *
 * ADMIN:
 *   Can see everything.
 *
 * NORMAL USER:
 *   Can only see their own records.
 */

const getQueryFilter = (req, extraFilter = {}) => {

  if (!req.user) {
    throw new Error('User not authenticated');
  }

  // ADMIN CAN SEE EVERYTHING
  if (req.user.role === 'Admin') {
    return {
      ...extraFilter
    };
  }

  // NORMAL USER
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    throw new Error('Invalid user ID');
  }

  return {
    ...extraFilter,

    user: req.user._id
  };
};


module.exports = {
  getQueryFilter
};