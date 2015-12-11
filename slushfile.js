"use strict";
const gulp = require('gulp');
const install = require('gulp-install');
const template = require('gulp-template');
const inquirer = require('inquirer');
const camelCase = require('camelcase');
const existsSync = require('path-exists').sync;
const path = require('path');
const fs = require('fs');
const conflictMerge = require('./lib/conflict-merge');
gulp.task('default', function (done) {
    let packagejson = {};
    if (existsSync('package.json')) {
        packagejson = JSON.parse(fs.readFileSync('package.json'));
    }
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'Give your package a name:',
                default: packagejson.name || path.parse(process.cwd()).name
            },
            {
                type: 'input',
                name: 'description',
                message: 'What does your package do?',
                default: packagejson.description
            },
        ],
        function (answers) {
            answers.camelCasedName = camelCase(answers.name);
            gulp.src(__dirname + '/templates/app/**', {dot:true}) // Note use of __dirname to be relative to generator
                .pipe(template(answers)) // Lodash template support
                .pipe(conflictMerge)
                .pipe(gulp.dest('./')) // Without __dirname here = relative to cwd
                .pipe(install()) // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {done();}) // Finished!
                .resume();
        }
    )
});
