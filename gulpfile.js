'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', function () {
    return gulp.src('./es6_study.js').pipe(babel({
        presets: ['es2015']
    })).pipe(gulp.dest('./_compiled'));
});

gulp.task('watch', function(){
    gulp.watch('./es6_study.js',['build']);
});


gulp.task('default',['watch']);