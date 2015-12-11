"use strict";
const inquirer = require('inquirer');
const existsSync = require('path-exists').sync;
const path = require('path');
const fs = require('fs');
const os = require('os');
const deepmerge = require('deepmerge');
const detectIndent = require('detect-indent');
const through2 = require('through2');
module.exports = through2({objectMode: true}, function (vfile, enc, cb) {
    let destPath = path.join(process.cwd(), vfile.relative);
    if (!existsSync(destPath)) {
        this.push(vfile);
        return cb();
    }
    if (fs.statSync(destPath).isDirectory()) {
        this.push(vfile);
        return cb();
    };
    let message = vfile.relative + ' exists. ';
    let defaultAnswer = 'o';
    if (".json" === path.parse(vfile.path).ext) {
        message += '(m)erge in scaffolding, ';
        defaultAnswer = 'm';
    }
    message += '(k)eep or (o)verwrite?';
    inquirer.prompt([{
        type: 'input',
        name: 'whatToDo',
        message: message,
        default: defaultAnswer
    }], function (existsAnswer) {
        existsAnswer.whatToDo = existsAnswer.whatToDo.toLowerCase();
        if ('m' === existsAnswer.whatToDo) {
            let destContents = fs.readFileSync(destPath, {encoding: 'utf8'});
            vfile.contents = new Buffer(JSON.stringify(deepmerge(
                JSON.parse(vfile.contents.toString()),
                JSON.parse(destContents)
            ), null, detectIndent(destContents).indent) + os.EOL)
            this.push(vfile);
        } else if ('o' === existsAnswer.whatToDo) {
            this.push(vfile);
        }
        return cb();
    }.bind(this));
});
