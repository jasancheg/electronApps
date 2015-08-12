/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var ipc = require('ipc');

module.exports.bootstrap = function(cb) {

    var initServerData = {
        port: sails.config.port,
        rootPath: sails.config.rootPath,
        appPath: sails.config.appPath,
        session: sails.config.session,
        csrf: sails.config.csrf
    };

    ipc.send('sails-lifted', initServerData);

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();

};