var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('imagemin');
var texturepacker = require('spritesmith-texturepacker');
var folders = require("gulp-folders");
var npmpath = require("path");
var pngquant = require("imagemin-pngquant");
var merge = require("merge-stream");

gulp.task('sprites', folders("src/images/spritesheetImages/", function (folder) {
        // Generate our spritesheet
       var spriteData = gulp.src(npmpath.join("src/images/spritesheetImages/", folder, '*.png'))
           .pipe(spritesmith({
                imgName: 'sprite_' + folder + '.png',
                cssName: 'sprite_' + folder + '.json',
                algorithm: 'binary-tree',
                cssTemplate: texturepacker
            }));

        // Pipe image stream through image optimizer and onto disk
        var imgStream = spriteData.img
            // .pipe(imagemin({
            //     progressive: true,
            //     interlaced: true,
            //     optimizationLevel: 7,
            //     svgoPlugins: [{removeViewBox: false}, {removeUselessStrokeAndFill: false}],
            //     use: [pngquant({quality: '65-80', speed: 4})]
            // }))
            .pipe(gulp.dest('dist/textures/spriteSheets'));

        // Pipe CSS stream through CSS optimizer and onto disk
        var cssStream = spriteData.css
            .pipe(gulp.dest('src/js/data/sprites'))
            // .pipe(notify({message: 'SPRITE SCSS task complete', onLast: true}));

        // Return a merged stream to handle both `end` events
        return merge(imgStream, cssStream);

}));
