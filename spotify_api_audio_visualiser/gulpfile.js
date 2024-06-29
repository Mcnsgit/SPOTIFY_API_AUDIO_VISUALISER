import gulp from "gulp";
import eslint from "gulp-eslint";

// Lint Task
gulp.task("lint", () => {
	return gulp.src(["src/**/*.js", "src/**/*.jsx"])
		.pipe(eslint({ fix: true })) // Enable fixing
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(gulp.dest("src")); // Write fixed files back to src
});

gulp.task("default", gulp.series("lint"));