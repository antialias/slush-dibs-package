"use strict";
const gulp = require('gulp');
const install = require('gulp-install');
const template = require('gulp-template');
const inquirer = require('inquirer');
const camelCase = require('camelcase');
gulp.task('default', function (done) {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'Give your package a name:',
                default: require('path').parse(process.cwd()).name
            },
            {
                type: 'input',
                name: 'description',
                message: 'What does your package do?'
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
