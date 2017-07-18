/*guardamos en variables instancias que ocuparemos usando en metodo require.*/
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var obfuscate = require("gulp-obfuscate");
var sass = require("gulp-sass")
/*la instancia browsersync la traemos utilizando .create al final*/
var browserSync = require("browser-sync").create();

/*almacenamos en un objeto las rutas que utilizaremos,el asterisco indica que buscara todos los archivos de ese tipo*/
var rutas = {
	rutaJS: 'src/assets/js/*.js',
	rutaSCSS: 'src/assets/scss/*.scss',
	rutaHTML: 'src/*.html'
}

/*escribimos primera tarea,consta de una entrada, que dira de donde obtenemos el archivo fuente un proceso realizado através del metodo pipe que indicarará que se quiere hacer y una salida igualmente transportada por un pipe que dira donde se quiere colar esta información. esta tarea esta dedicada a realizar un archivo de js  que se utilizará en producción y se guardará en carpeta public */
	
gulp.task("prepararJS", function(){
     gulp.src(rutas.rutaJS)
	 .pipe(uglify())
	 .pipe(obfuscate())
	 .pipe(gulp.dest('public/js/minificado'));
	 
})

/*esta segunda tarea esta designada para realizar un archivo en carpeta public igualmente que será utilizado en producción, la diferencia es que no tiene un proceso a ejecutar, solamente se ejecuta para poder crear  el archivo.*/
/*referente a la sintaxis */
gulp.task("prepararHTML", function(){
     gulp.src(rutas.rutaHTML)
	 .pipe(gulp.dest('public'));

		   })
		   
/*esta tercer tarea tiene como objetivo realizar el mismo mecanismo de traducir el archivo scss a css, esto se logra através de outputStyle(nota pregunta que es, atributo, un objeto etc)  
on nos ayuda a que nos marque los errores al logear ayudandonos a tener un codigo mas debugeable y por ultimo el ultimo es la ultima etapa de salida donde  através de gulp.dest decimos a donde se iran estos cambios(se refiere al archivo css de la carpeta publics)*/
gulp.task("prepararSCSS", function(){
     gulp.src(rutas.rutaSCSS)
	.pipe(sass({outputStyle: 'compressed'})
	.on('error', sass.logError))
	.pipe(gulp.dest('public/css/minificado'));
	 
})

/*esta siguente tarea tiene dos objetivos, el primero es inicializar el servidor ( por lo cual ya no es necesario utilziar express) y despues le dice a gulp que va a estar checando las acciones realizadas en esta tura y que se le ejecute la tarea sass-watch (que esta abajo) cabe decir que esta en corchetes por que es un arreglo, por lo cual podr recibir mas acciones como es el caso de la tarea de abajo; también es importante decir que esta tarea nos ayuda a no estar ejecutando muchas veces la tarea prepararCSS */
gulp.task("watchChangesCSS", function(){
	browserSync.init({
		server:{
			baseDir: "./public"
		}
	});
	gulp.watch(rutas.rutaSCSS ,["sass-watch"])
});
/*esta tarea hace referencia que con base a la tarea de arriba esta se encargará de recargar el servidosp ara que los cambios efectuados tambien se reflejen en la pagina y n otengamos que estar recargando multiples veces */

gulp.task("sass-watch",["prepararSCSS","prepararHTML"],function(){
	browserSync.reload();
})


