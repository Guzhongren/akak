var gulp = require('gulp');

gulp.task('default', function () {
    gulp.watch("./src/index.js", () => {
        gulp.src("./src/index.js")
            .pipe(gulp.dest("./wwwroot/dist/js/"))
    })
});