var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var texturepacker = require('spritesmith-texturepacker');

// gulp.task('sprites', function() {
//     var spriteData = gulp.src('src/images/spritesheetImages/**/*.png')
//         .pipe(spritesmith({
//             imgName: 'countryBorders.png',
//             cssName: 'countryBorders.json',
//             algorithm: 'binary-tree',
//             cssTemplate: texturepacker
//     }));
//     spriteData.img.pipe(gulp.dest('dist/textures/spriteSheets'));
//     spriteData.css.pipe(gulp.dest('src/js/data'));
// });

gulp.task('sprites', folders("src/images/spritesheetImages/**/*.png", function (folder) {
        // Generate our spritesheet
       var spriteData = gulp.src(npmpath.join(path.src.sprites, folder, '*.png'))
           .pipe(spritesmith({
                imgName: 'sprite_' + folder + '.png',
                cssName: 'sprite_' + folder + '.json',
                algorithm: 'binary-tree',
                cssTemplate: texturepacker
            }));

        // Pipe image stream through image optimizer and onto disk
        var imgStream = spriteData.img
            .pipe(imagemin({
                progressive: true,
                interlaced: true,
                optimizationLevel: 7,
                svgoPlugins: [{removeViewBox: false}, {removeUselessStrokeAndFill: false}],
                use: [pngquant({quality: '65-80', speed: 4})]
            }))
            .pipe(gulp.dest('dist/textures/spriteSheets'))
            .pipe(notify({message: 'SPRITE IMG task complete', onLast: true}));
        // Pipe CSS stream through CSS optimizer and onto disk
        var cssStream = spriteData.css
            .pipe(gulp.dest('src/js/data'))
            .pipe(notify({message: 'SPRITE SCSS task complete', onLast: true}));

        // Return a merged stream to handle both `end` events
        return merge(imgStream, cssStream);

}));
