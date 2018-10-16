//引入gulp及各种组件;
'use strict';
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),                                //压缩js
    minifyCSS = require('gulp-clean-css'),                          //压缩css
    gulpSequence = require('gulp-sequence'),                        //按顺序执行任务，不能省略return
    rename = require('gulp-rename'),                                //重命名
    cached = require('gulp-cached'),                                //缓存
    fontspider = require('gulp-font-spider'),                       //字蛛，中文字体压缩，.html文件加入文字时需执行
    imagemin = require('gulp-imagemin'),                            //图片压缩
    assetRev = require('gulp-asset-rev'),                           //为css中引入的图片/字体等添加hash编码
    rev = require('gulp-rev'),                                      //版本号
    revCollector = require('gulp-rev-collector'),                   //在html中更改版本号路径
    plumber = require('gulp-plumber'),                              //插件发生错误导致进程退出并输出错误日志
    merge = require('merge-stream'),                                //合并流
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),   //jpg图片压缩
    imageminOptipng = require('imagemin-optipng'),                  //png图片压缩
    browserSync = require('browser-sync').create();                 //浏览器自动刷新

//设置各种输入输出文件夹的位置;
var SRC_DIR = 'src/',
    PUB_DIR = 'public/',
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
        .pipe(rev())                //添加版本号
        .pipe(gulp.dest(PUB_DIR_SCRIPT))
        .pipe(rev.manifest())       //根据版本号生成rev-manifest.json
        .pipe(gulp.dest('src/rev/js'));

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
        .pipe(assetRev())
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(rev())
        .pipe(gulp.dest(PUB_DIR_CSS))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'));

    var css_min = gulp.src(SRC_DIR_MIN_CSS)
        .pipe(rev())
        .pipe(gulp.dest(PUB_DIR_CSS))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'));

    return merge(css, css_min);

});

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射


//SASS文件输出CSS,天生自带压缩特效;
//命令行使用gulp sass启用此任务;
/*gulp.task('sass', function() {
    gulp.src(srcSass)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(dstSass));
});*/

//为css中引入的图片/字体等添加hash编码
/*gulp.task('assetRev', function(){
    return gulp.src(SRC_DIR_CSS)   //该任务针对的文件
        .pipe(assetRev())  //该任务调用的模块
        .pipe(gulp.dest(PUB_DIR_CSS)); //编译后
    // 的路径
});*/


//图片压缩任务,支持JPEG、PNG及GIF文件,图片加入版本号;
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
        .pipe(rev())
        .pipe(imagemin({
            use: [jpgmin, pngmin]
        }))
        .pipe(gulp.dest(PUB_DIR_IMAGE))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/image'));
});

//把所有html页面扔进public文件夹(不作处理);
//命令行使用gulp html启用此任务;
gulp.task('html', function() {
    return gulp.src(SRC_DIR_HTML)
        .pipe(gulp.dest(PUB_DIR));
});

//Html替换css、js、image文件版本
gulp.task('revHtml', function () {
    return gulp.src(['src/rev/**/*.json','src/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(SRC_DIR))
})


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
        .pipe(fontspider())
});

//服务器任务:以public文件夹为基础,启动服务器;
//命令行使用gulp server启用此任务;
gulp.task('server', function() {
    return browserSync.init({
        server: PUB_DIR
    });
});


//监控改动并自动刷新任务;
//命令行使用gulp auto启动;
gulp.task('auto', function() {
    gulp.watch(SRC_DIR_SCRIPT, function (event) {
        gulpSequence('script','revHtml')(function (err) {
            if (err) console.log(err)
        })
    });
    gulp.watch(SRC_DIR_CSS, function(event){
        gulpSequence('css','revHtml')(function (err) {
            if (err) console.log(err)
        })
    });
    /*gulp.watch(srcSass, ['sass']);*/
    gulp.watch(SRC_DIR_IMAGE, function (event) {
        gulpSequence('imgmin','revHtml')(function (err) {
            if (err) console.log(err)
        })
    });

    gulp.watch(SRC_DIR_HTML, function (event) {
        gulpSequence('revHtml','html')(function (err) {
            if (err) console.log(err)
        })
    });

    // gulp.watch(SRC_DIR_HTML, ['html']);
    // gulp.watch(PUB_DIR_HTML, ['fontspider']);
    gulp.watch(PUB_DIR + '**/*.*').on('change', browserSync.reload);
});


//gulp默认任务(); 圆括号中顺序执行，中括号同时执行
gulp.task('default', gulpSequence(['script', 'css', 'imgmin' ],'revHtml', 'html','server','auto'));