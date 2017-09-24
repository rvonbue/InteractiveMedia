var gulp = require("gulp");
var gulpBase64 = require("gulp-to-base64");
gulp.task("build", [
  "build:base64"
]);

 gulp.task('build:base64' , function(){
   return gulp.src("./src/images/pngs/*.{png,jpg,jpeg,mp3,svg,ttf}")
     .pipe(gulpBase64({
         size: true,  // false by default  , if true , write the width height
         outPath:"./src/js/data/countryBordersBase64.js"  //output file path
     }))
 });
