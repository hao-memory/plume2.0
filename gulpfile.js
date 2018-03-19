/**
 * Created by Stone on 2016/8/15.
 */
//引入插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'), //处理串行任务
    uglify = require('gulp-uglify'),//专业压缩js
    imagemin = require('gulp-imagemin'),    //压缩图片
    notify = require('gulp-notify'), //图片缓存，只有图片替换了才压缩
    cache = require('gulp-cache'),//更改提醒（ gulp-notify ）
    pngquant = require('imagemin-pngquant'),//深度压缩
    changed = require('gulp-changed'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),//处理浏览器前缀
    del = require('del'),
    minifycss = require('gulp-minify-css'),//压缩css
    csso = require('gulp-csso'),//压缩css
    concat = require('gulp-concat'),//合并文件
    replace = require('gulp-replace'),//替换
    htmlmin = require('gulp-htmlmin'),//压缩html
    clean = require('gulp-clean');//清理文件夹
//定义路径
var cssSrc = ['./css/*/*.css'],
    cssDest = './dist/css',
    confSrc = './conf/*.js',
    confDest = './dist/conf',
    jsSrc = ['./js/**/*.js', './js/*.js','./js/**/**/*.js'],
    jsDest = './dist/js',
    imgSrc = ['./images/**'],
    imgDest = './dist/images',
    phoScr = ['./photo/**/*.{png,jpg,jpeg,gif,ico}','./photo/**/**/*.{png,jpg,jpeg,gif,ico}'],
    phoDest = './dist/photo',
    pagesSrc = [ './pages/**/*.html', './pages/**/**/*.html'],
    pagesDest = './dist',
    wapSrc = [ './wap/**/*.html'],
    wapDest = './dist',
    mediaSrc = [ './media/**'],
    mediaDest = './dist/media/',
    condition = true;


gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});
//压缩js
gulp.task('minjs', function () {
    return gulp.src(jsSrc)// 压缩js,对变量压缩['./p-hongmei-app-h5/js/*.js']
        .pipe(uglify({
            mangle: false//类型：Boolean 默认：true 是否修改变量名
        }))
        .pipe(replace(/\.(js|css|png|jpg|jpeg|gif|ico)(\?_v=\d+)?([\'\"])/g, '.$1?_v=' + new Date().getTime() + '$3'))
        .pipe(gulp.dest(jsDest));//输出结果
});
//压缩路由
gulp.task('route', function () {
    return gulp.src(['./conf/*.js', '!./conf/config-resources.js', '!./conf/config-route.js'])
        .pipe(concat('config-route.js'))
        .pipe(gulp.dest('./conf'));
});
//压缩js
gulp.task('minConf', ['route'], function () {
    return gulp.src(confSrc)// 压缩js,对变量压缩['./p-hongmei-app-h5/js/*.js']
        .pipe(uglify({
            mangle: false//类型：Boolean 默认：true 是否修改变量名
        }))
        .pipe(replace(/\.(js|css|png|jpg|jpeg|gif|ico)(\?_v=\d+)?([\'\"])/g, '.$1?_v=' + new Date().getTime() + '$3'))
        .pipe(gulp.dest(confDest));//输出结果
});
//压缩css
// gulp.task('mincss', function(){
//     return gulp.src(cssSrc)
//         .pipe( csso() )
//         .pipe( gulp.dest( cssDest ));
// });
//压缩图片
gulp.task('minimage', function () {
    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDest));
});
//压缩图片
gulp.task('minPhoto', function () {
    return gulp.src(phoScr)
        .pipe(imagemin())
        .pipe(gulp.dest(phoDest));
});
//深度压缩
gulp.task('testImagemin', function () {
    return gulp.src(imgSrc)
        .pipe(cache(imagemin({
            progressive: true,//类型：Boolean 默认：false 无损压缩jpg图片
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()]//使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest(imgDest));
});
//深度压缩
gulp.task('testPhotomin', function () {
    return gulp.src(phoScr)
        .pipe(cache(imagemin({
            progressive: true,//类型：Boolean 默认：false 无损压缩jpg图片
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()]//使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest(phoDest));
});
gulp.task('minpages', function () {
    var options = {
        collapseBooleanAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    return gulp.src(pagesSrc, {base: './'})
        .pipe(htmlmin(options))
        .pipe(replace(/\.(js|css|png|jpg|jpeg|gif|ico)(\?_v=\d+)?([\'\"])/g, '.$1?_v=' + new Date().getTime() + '$3'))
        .pipe(gulp.dest(pagesDest));
});
gulp.task('minwap', function () {
    var options = {
        collapseBooleanAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    return gulp.src(wapSrc, {base: './'})
        .pipe(htmlmin(options))
        .pipe(replace(/\.(js|css|png|jpg|jpeg|gif|ico)(\?_v=\d+)?([\'\"])/g, '.$1?_v=' + new Date().getTime() + '$3'))
        .pipe(gulp.dest(wapDest));
});
//复制外部包文件
gulp.task('copys', function () {
    var src = ['./pages/ac161111/conf/*.json'];
    var target = './pages/ac161111/conf';
    gulp.src(src, {base: './'})
        .pipe(gulp.dest(target));
});
gulp.task('copy', function () {
    var src = ['./images/**/**/icons/*'];
    var target = './images/**/**/icons';
    gulp.src(src, {base: './'})
        .pipe(gulp.dest(target));
});
gulp.task('copyt', function () {
    var src = ['./pulg/*'];
    var target = './dist';
    gulp.src(src, {base: './'})
        .pipe(gulp.dest(target));
});
gulp.task('copyc', function () {
    var src = ['./css/*/*.css'];
    var target = './dist';
    gulp.src(src, {base: './'})
        .pipe(gulp.dest(target));
});
gulp.task('copyMedia', function () {
    gulp.src(['./media/**'])
        .pipe(gulp.dest('./dist/media'));
});

//正式构建
gulp.task('release', function (done) {
    runSequence(
        ['clean'],
        ['minjs', 'minConf'],
        ['testImagemin','testPhotomin'],
        ['minpages','minwap'],
        ['copys','copy','copyc','copyMedia'],
        done);
});


