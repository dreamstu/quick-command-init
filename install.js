'use strict';

exports.name = 'init';
exports.usage = '<names> [options]';
exports.desc = 'Initialize a module';

exports.register = function(commander,quick){

    commander
        .option('-r, --root <path>', 'set serve root')
        .option('-t, --template [value]', 'set template name')
        .option('-u, --upgrade [b]', 'update available template.')
        .action(function(){

            var args = [].slice.call(arguments);
            var options = args.pop();

            var settings = {
                root: options.root || '.',
                template:options.template || 'seajs',
                upgrade:options.upgrade || false
            };

            var init = require('./lib/init')(quick,settings);
            init.start();
        });
};