var path = require('path');
var fs = require('fs');
var exists = fs.existsSync;
var helper = require('./helper');
var shell = require('shelljs');
var grunt = require('grunt');

module.exports = main = function(quick,opts){

    var exports = {};

    var template = opts.template;

    var templatepath = path.join(helper.initDir, template);

    var giturl = 'git://github.com/dreamstu/quick-init-{{template}}.git'.replace('{{template}}',template);

    var upgrade = opts.upgrade;

    /***
     * 必须的grunt-init是否安装好，以及quick template是否安装好
     * @returns {*}
     */
    exports.start = function(){
        if (upgrade) {
            helper.gitInstall(giturl, templatepath);
            return;
        }
        if (!exists(templatepath)) {
            helper.gitInstall(giturl, templatepath)
                .on('close', runTask);
        } else {
            runTask();
        }
    };

    /*
     run grunt init task
     */
    function runTask() {
        grunt.task.loadTasks(path.join(__dirname, '../node_modules/grunt-init/tasks'));
        // fix windows directory by replace C:\ to C\:\
        var taskName = 'init:' + templatepath.replace(/^([a-zA-Z]):\\/, '$1\\:\\');
        grunt.cli.tasks = [taskName];
        grunt.cli({});
    };

    return exports;
};