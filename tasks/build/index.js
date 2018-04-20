var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var texturepacker = require('spritesmith-texturepacker');

gulp.task('sprites', function() {
    var spriteData = gulp.src('src/images/spritesheetImages/**/*.png')
        .pipe(spritesmith({
            imgName: 'countryBorders.png',
            cssName: 'countryBorders.json',
            algorithm: 'binary-tree',
            cssTemplate: texturepacker
    }));
    spriteData.img.pipe(gulp.dest('dist/textures/spriteSheets'));
    spriteData.css.pipe(gulp.dest('src/js/data'));
});
