//引入gulp及各种组件;
'use strict';
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-clean-css'),
    gulpSequence = require('gulp-sequence'),
    rename = require('gulp-rename'),
    cached = require('gulp-cached'),
    fontspider = require('gulp-font-spider'),
    imagemin = require('gulp-imagemin'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    plumber = require('gulp-plumber'),
    merge = require('merge-stream'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminOptipng = require('imagemin-optipng'),
    browserSync = require('browser-sync').create();

//设置各种输入输出文件夹的位置;
var SRC_DIR = './src/',
    PUB_DIR = './public/',
    SRC_DIR_SCRIPT = SRC_DIR + 'js/*.js',
    SRC_DIR_MIN_SCRIPT = SRC_DIR + 'js/*.min.js',
    SRC_DIR_CSS = SRC_DIR + 'css/*.css',
    SRC_DIR_MIN_CSS = SRC_DIR + 'css/*.min.css',
    SRC_DIR_IMAGE = SRC_DIR + 'images/*',
    SRC_DIR_FONT = SRC_DIR + 'font/*',
    SRC_DIR_HTML = SRC_DIR + '*.html',

    PUB_DIR_SCRIPT = PUB_DIR + 'js',
    PUB_DIR_CSS = PUB_DIR + 'css',
    PUB_DIR_IMAGE = PUB_DIR + 'images',
    PUB_DIR_HTML = PUB_DIR + '*.html',
    PUB_DIR_FONT = PUB_DIR + 'font';

//处理JS文件:压缩,然后换个名输出;
//命令行使用gulp script启用此任务;
gulp.task('script', function() {
    //未压缩文件压缩
    var script =  gulp.src([SRC_DIR_SCRIPT,'!' + SRC_DIR_MIN_SCRIPT])
        .pipe(cached('js'))        //只编译修改过的文件
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(PUB_DIR_SCRIPT));

    //已压缩文件复制
    var script_min =  gulp.src(SRC_DIR_MIN_SCRIPT)
        .pipe(gulp.dest(PUB_DIR_SCRIPT));

    return merge(script, script_min);
});

//处理CSS文件:压缩,然后换个名输出;
//命令行使用gulp css启用此任务;
gulp.task('css', function() {

    var css = gulp.src([SRC_DIR_CSS,'!' + SRC_DIR_MIN_CSS])
        .pipe(cached('css'))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(PUB_DIR_CSS));

    var css_min = gulp.src(SRC_DIR_MIN_CSS)
        .pipe(gulp.dest(PUB_DIR_CSS));

    return merge(css, css_min);

});


//SASS文件输出CSS,天生自带压缩特效;
//命令行使用gulp sass启用此任务;
/*gulp.task('sass', function() {
    gulp.src(srcSass)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(dstSass));
});*/


//图片压缩任务,支持JPEG、PNG及GIF文件;
//命令行使用gulp jpgmin启用此任务;
gulp.task('imgmin', function() {
    var jpgmin = imageminJpegRecompress({
            accurate: true,//高精度模式
            quality: "high",//图像质量:low, medium, high and veryhigh;
            method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 70,//最低质量
            loops: 0,//循环尝试次数, 默认为6;
            progressive: false,//基线优化
            subsample: "default"//子采样:default, disable;
        }),

        pngmin = imageminOptipng({
            optimizationLevel: 4
        });

    return gulp.src(SRC_DIR_IMAGE)
        .pipe(cached('imgmin'))
        .pipe(imagemin({
            use: [jpgmin, pngmin]
        }))
        .pipe(gulp.dest(PUB_DIR_IMAGE));
});

//把所有html页面扔进public文件夹(不作处理);
//命令行使用gulp html启用此任务;
gulp.task('html', function() {
    return gulp.src(SRC_DIR_HTML)
        .pipe(gulp.dest(PUB_DIR));
});

//复制字体文件
gulp.task('font', function() {
    return gulp.src(SRC_DIR_FONT)
        .pipe(plumber())
        .pipe(gulp.dest(PUB_DIR_FONT))
        .pipe(browserSync.stream());
});


// fontspider任务，在public中压缩字体文件并替换。
gulp.task('fontspider', function() {
    return gulp.src(PUB_DIR_HTML)  //只要告诉它html文件所在的文件夹就可以了
        .pipe(fontspider());
});

//服务器任务:以public文件夹为基础,启动服务器;
//命令行使用gulp server启用此任务;
gulp.task('server', function() {
    browserSync.init({
        server: PUB_DIR
    });
});


//监控改动并自动刷新任务;
//命令行使用gulp auto启动;
gulp.task('auto', function() {
    gulp.watch(SRC_DIR_SCRIPT, ['script']);
    gulp.watch(SRC_DIR_CSS, ['css']);
    /*gulp.watch(srcSass, ['sass']);*/
    gulp.watch(SRC_DIR_IMAGE, ['imgmin']);
    gulp.watch(SRC_DIR_HTML, ['html']);
/*    gulp.watch(PUB_DIR_HTML, ['fontspider']);*/
    gulp.watch(PUB_DIR + '**/*.*').on('change', browserSync.reload);
});


//gulp默认任务(); 圆括号中顺序执行，中括号同时执行
gulp.task('default', gulpSequence(['script', 'css', 'imgmin' ],'html' ,'server','auto'));