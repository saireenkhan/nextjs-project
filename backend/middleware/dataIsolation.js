const enforceDataIsolation = (schema) => {

  // READ operations
  schema.pre(
    ['find', 'findOne', 'findOneAndUpdate', 'countDocuments'],
    function (next) {

      const user = this.getOptions().userContext;

      // If no user context, don't modify query
      if (!user) {
        return next();
      }

      // ADMIN sees everything
      if (user.role === 'Admin') {
        return next();
      }

      // NORMAL USER
      this.where({
        user: user._id
      });

      next();
    }
  );

};

module.exports = enforceDataIsolation;