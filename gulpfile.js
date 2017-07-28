var gulp        = require('gulp');
var connect     = require('gulp-connect-php');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

// Static Server + watching sass/html files
gulp.task('serve', ['sass'], function() {

    connect.server({}, function (){
        browserSync.init({
          proxy: '127.0.0.1:8000'
        });
    });

    gulp.watch("./sass/*.sass", ['sass']);
    gulp.watch("./*.php").on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);