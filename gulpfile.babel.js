import del from 'del'

import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import changed from 'gulp-changed'
import babel from 'gulp-babel'
import mocha from 'gulp-mocha'
import postcss from 'gulp-postcss'
import salad from 'postcss-salad'
import seq from 'gulp-sequence'
import rename from 'gulp-rename'

import saladConfig from './theme-default/salad.config.json'

saladConfig.features = saladConfig.features || {}
saladConfig.features.sassColor = false
saladConfig.features.partialImport = false
saladConfig.features.precss = false

gulp.task('clean', () => {
  return del(['dist', 'test/actual'])
})

gulp.task('compile', () => {
  return gulp.src('src/**/*.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('lib'))
})

gulp.task('build', () => {
  return gulp.src('theme-default/src/*.css')
    .pipe(postcss([salad(saladConfig)]))
    .pipe(gulp.dest('./dist'))
})

gulp.task('test', () => {
  return gulp.src('test/*.js')
    .pipe(babel())
    .pipe(mocha({
      reporter: 'spec'
    }))
})

gulp.task('postcss', () => {
  const css2scss = require('./lib/').default

  return gulp.src('test/origin/**/*.css')
    .pipe(postcss([css2scss()]))
    .pipe(rename({
      extname: '.scss'
    }))
    .pipe(gulp.dest('test/actual/'))
})

gulp.task('build:scss', () => {
  const css2scss = require('./lib/').default

  return gulp.src('theme-default/src/**/*.css')
    .pipe(postcss([
      css2scss(),
      salad(saladConfig),
      require('postcss-property-lookup')
    ]))
    .pipe(rename({
      extname: '.scss'
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task("build:copyfont", () => {
  return gulp.src('theme-default/src/fonts/**')
    .pipe(gulp.dest('./dist/fonts'))
})

gulp.task('dev', seq('clean', 'compile', 'postcss', 'test'))
gulp.task('build', seq('clean', 'compile', ['build:scss', 'build:copyfont']))
