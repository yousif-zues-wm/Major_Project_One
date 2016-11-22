/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  connection: 'localDiskDb',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  migrate: 'safe',

  attributes: {
        name: {
            type: 'text',
            required: true
        },
        email: {
            type: 'email',
            required: true
        },
        age: {
            type: 'integer',
	          min: 18,
	          max: 100,
            required: false
        },
        isEnabled: {
          type: 'boolean',
          defaultsTo: false
        },
        admin: {
            type: 'boolean',
            required: true,
            defaultsTo: false
        }
}


};