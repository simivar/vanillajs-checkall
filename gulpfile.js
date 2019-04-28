let paths = {
        input: 'src/*',
        output: 'dist/*',
        scripts: {
            input: 'src/*',
            output: 'dist/'
        }
    },
    banner = {
        full:
            '/*!\n' +
            ' * <%= package.name %> v<%= package.version %>: <%= package.description %>\n' +
            ' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
            ' * MIT License\n' +
            ' * <%= package.repository.url %>\n' +
            ' */\n\n',
        min:
            '/*!' +
            ' <%= package.name %> v<%= package.version %>' +
            ' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
            ' | MIT License' +
            ' | <%= package.repository.url %>' +
            ' */\n'
    },
    gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    optimizejs = require('gulp-optimize-js'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    rename = require('gulp-rename'),
    lazypipe = require('lazypipe'),
    header = require('gulp-header'),
    terser = require('gulp-terser'),
    packageJson = require('./package.json');

gulp.task('build:scripts', function(done) {
    var jsTasks = lazypipe()
        .pipe(header, banner.full, { package : packageJson })
        .pipe(optimizejs)
        .pipe(gulp.dest, paths.scripts.output)
        .pipe(rename, { suffix: '.min' })
        .pipe(terser)
        .pipe(optimizejs)
        .pipe(header, banner.min, { package : packageJson })
        .pipe(gulp.dest, paths.scripts.output);

    gulp.src(paths.scripts.input)
        .pipe(plumber())
        .pipe(jsTasks());

    done();
});

gulp.task('lint:scripts', function () {
    return gulp.src(paths.scripts.input)
        .pipe(plumber())
        .pipe(eslint({
            'configFile': '.eslintrc.js'
        }));
});

gulp.task('clean:dist', function (done) {
    del.sync([
        paths.output
    ]);
    done();
});

gulp.task('default', gulp.series(
    'lint:scripts',
    'clean:dist',
    'build:scripts'
));