var gulp = require('gulp');

gulp.task('default', function () {
    gulp.watch("./src/**/*", () => {
        gulp.src("./src/**/*")
            .pipe(gulp.dest("./wwwroot/dist/"))
    })
});