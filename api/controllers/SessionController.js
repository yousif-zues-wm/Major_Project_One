/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		'new' : function(req, res, next){
			var oldDateObj = new Date();
			var newDateObj = new Date(oldDateObj.getTime() + 6000);
			req.session.authenticated = true;
			console.log(req.session);
			res.view('session/new');
			console.log(req.session.authenticated);
		}

		// 'test' : function(req, res, next){
		// 	res.view('/session/test');
		// 	console.log('working');
		// },

};
