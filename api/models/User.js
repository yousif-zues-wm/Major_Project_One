/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: "string",
      required: true
    },
    toJSON: function(){
    var obj = this.toObject();
    delete obj.password;
    delete obj.encryptedPassword;
    delete obj.name;
    delete obj._csrf;
    delete obj;
      }
  },


    beforeCreate : function(values, next){
      require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
          if (err) return next(err);
          values.encryptedPassword = encryptedPassword;
          // values.online = true;
          next();
      });

    }
    // toJSON: function(){
    //   var obj = this.toObject();
    //   delete obj.password;
    //   delete obj.encryptedPassword;
    //   delete obj._csrf;
    //   return obj;
    // }

};
