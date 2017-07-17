var gulp = require("gulp");
var uglify = require("gulp-uglify");
var obfuscate = require("gulp-obfuscate");
var sass = require("gulp-sass")
var browserSync = require("browser-sync").create();

var rutas = {
	rutaJS: 'src/assets/js/*.js',
	rutaSCSS: 'src/assets/scss/*.scss',
	rutaHTML: 'src/*.html'
}


	
gulp.task("prepararJS", function(){
     gulp.src(rutas.rutaJS)
	 .pipe(uglify())
	 .pipe(obfuscate())
	 .pipe(gulp.dest('public/js/minificado'));
	 
})

gulp.task("prepararHTML", function(){
     gulp.src(rutas.rutaHTML)
	 .pipe(gulp.dest('public'));

		   })
		   

gulp.task("prepararSCSS", function(){
     gulp.src(rutas.rutaSCSS)
	.pipe(sass({outputStyle: 'compressed'})
	.on('error', sass.logError))
	.pipe(gulp.dest('public/css/minificado'));
	 
})

gulp.task("watchChangesCSS", function(){
	browserSync.init({
		server:{
			baseDir: "./public"
		}
	});
	gulp.watch(rutas.rutaSCSS ,["sass-watch"])
});

gulp.task("sass-watch",["prepararSCSS","prepararHTML"],function(){
	browserSync.reload();
	/*stop();*/
})


