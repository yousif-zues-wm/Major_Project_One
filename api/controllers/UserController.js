/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


		login: function(req, res, next){
			// console.log(req.param('password'))
			//res.view('/user/login')
			res.view('user/login');

		},

		signin: function(req, res, next){
			var emailAddr = req.param('email');
			var pass = req.param('password');
			User.findOne({email : req.param('email'), password: req.param('password'), isEnabled: false}).exec(function(err, user){
			if (err) {
				return req.flash('Error')
			}
			if (user === undefined) {
					res.redirect('/user/loginF')
			}
			else{

			console.log('Success');
			req.session.regenerate(function(err) {

				console.log(req.sessionID)
				User.update(req.param('name'), {sid: req.sessionID}).exec(function(err, user) {
					if (err) {
					return res.serverError(err)}
				})
			})
			res.redirect('/');
			console.log(user.sid);
		}

			// console.log(user.name);
		})

	},

	loginF: function(req, res, next){
		// console.log(req.param('password'))
		//res.view('/user/login')
		res.view('user/loginF');

	},
	// login: function(req, res, next){
	// 	// console.log(req.param('password'))
	// 	//res.view('/user/login')
	//     return res.login({
	//       email: req.param('email'),
	//       password: req.param('password'),
	//       successRedirect: '/',
	//       invalidRedirect: '/user/login'
	//     });



	logout: function (req, res) {
		console.log(req.session.me)
    req.session.me = null;
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }
    return res.redirect('/');
  },

		// newSession : function(req, res, next){
		// 	console.log('Action');
		// 	User.findOne(req.param('email')).exec(function(err, user){
		// 		console.log(req.param('email'));
		// 		if(err){
		// 			return res.serverError(err);
		// 		}
		// 		else{
		// 			if (req.param('password') == user.password) {
		// 				res.session.user = user;
		// 				res.redirect('/');
		// 			}
		// 			else{
		// 				res.render('login Jade', {error: "invalid Email/ Password"});
		// 			}
		// 		}
		//
		// })
		//
		// logout : function(req,res,next){
		// 	res.session.reset();
		// 	res.redirect('/');
		// }

		// 'test' : function(req, res, next){
		// 	res.view('/session/test');
		// 	console.log('working');
		// },



		find: function(req, res,next){
			var id = req.param('id');
			User.find(id, {isEnabled: false}).exec(function(err, user){
				if (err) {
					return res.serverError(err);
				}
				return res.jsonx(user);
			});
		},


		destroy: function(req,res,next){
			var id = req.param('id');
			if (!id) {
				return res.badRequest('No id passed');
		}
		User.update(id, {isEnabled: true}).exec(function(err, user){
			if (err) {
				return res.serverError(err);
			}
			return res.redirect('/user/index1');
		});
	},

	admin: function(req,res,next){
		var id = req.param('id');
		if (id) {
			return res.badRequest('Not an admin');
		}
		User.find(id, {admin: true}).exec(function(err, user){
			if (err) {
				return res.serverError(err);
			}

			return res.jsonx(user);
		});
	},

	update: function(req, res, next){
		if (!req.body) {
			return res.badRequest('No body data passed');
		}
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No Id');
		}

		User.update(id, req.body).exec(function(err, user){
			if (err) {
					return res.serverError(err);
			}
			return res.jsonx(user);
		});
	},

	create: function(req, res, next){

		if (!req.body) {
			return res.badRequest('No body data passed');
		}
		var id = req.param('id');
		User.create(req.body).exec(function(err, user){
			if (err) {
				return res.serverError(err);
			}
			var adminCheck = parseInt(req.param('id')) % 2;
			if( adminCheck == 0){
				User.update(id, {admin: true}).exec(function(err, user){
					if (err) {
						return res.serverError(err);
					}
				});
			}
			return res.jsonx(user);
		});

	},
	new: function(req, res, next){
		res.locals.flash = _.clone(req.session.flash);
		res.view();
		req.session.flash = {};



	},

	 create: function(req, res, next){
		 User.create(req.params.all(), function userCreated(err, user){
			 if(err){
				 return res.serverError(err);
			 }
			//  return res.redirect('/user/new');
			//  return res.jsonx(user);

			res.redirect('user/show/' + user.id);
			console.log(user.sid)
		 });
	 },

	 show: function(req, res, next){
		 var id = req.param('id');
		 User.findOne(id).exec(function(err, user){
			 if (err) {
			 	return res.serverError(err);
			 }
			 if (!user) {
			 	next();
			 }
			 res.view({
				 user: user
			 });
		 });
	 },

	 index1: function(req, res, next){
		 var id = req.param('id');
		 console.log(new Date());

		//  User.findOne({sid: req.sessionID}).exec(function(err, user){
		// 	 if (err) {
		// 		return serverError(err);
		// 	 }
		// 		 res.redirect('user/index1u')
		//  })

		 User.find(id, {isEnabled: false}).exec(function(err, users){
			 console.log(req.param('session'))
			 if (err) {
			 	return res.serverError(err);
			 }
			 console.log(req.sessionID);
			//  User.findOne({sid: req.sessionID}).exec(function(err, user){
			// 	if (err) {
			// 		return res.serverError(err)
			// 	}
			// 	console.log(user.sid);
			//  });
			 res.view({
				 users : users
			 });

		 });
	 },

	 index1u: function(req, res, next){
		 var id = req.param('id');
		 User.findOne({sid: req.sessionID}).exec(function(err, user){
			 if (err) {
				return serverError(err);
			 }
			 res.view({
				 user: user
			 })
		 })
		 User.find(id, {isEnabled: false}).exec(function(err, users){
			 if (err) {
			 	return res.serverError(err);
			 }
			 res.view({
				 users : users
			 });

		 });
	 },



	 edit: function(req, res, next){
		 var id = req.param('id');
		 User.findOne(id, {isEnabled: false}).exec(function(err, user){
			 if (err) {
			 	return res.serverError(err);
			 }
			 if (!user) {
			 		return next();
			 }
			 res.view({
				 user: user
			 });
		 });
	 },

	 update: function(req,res,next){
		User.update(req.param('id'), req.params.all()).exec(function(err){
			if (err) {
				return res.redirect('/user/edit/' + req.param('id'));
			}
			res.redirect('/user/show/' + req.param('id'));
		});
	 }
};
