import gulp from "gulp"
import run from "gulp-run"
import terser from "gulp-terser"
import rename from "gulp-rename"
import { deleteAsync, deleteSync } from "del"

gulp.task("clean", function () {
  return deleteAsync(["dist/*"])
})

gulp.task('build-js', function () {
  return run('tsc').exec()
})

gulp.task('compress-js', function () {
  return gulp.src('dist/*.js')              // 指定要压缩的 JS 文件路径
    .pipe(terser())                         // 使用 gulp-terser 插件进行压缩
    .pipe(rename({ suffix: '.min' }))   // 重命名为 .min.js 文件
    .pipe(gulp.dest('dist'))                // 输出到同一目录
})

gulp.task("finish", function () {
  return deleteAsync(["dist/mouse.js"])
})

gulp.task('build', gulp.series('clean', 'build-js', 'compress-js', "finish"));
