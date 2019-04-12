//Inicio Programa
let colors = require('colors/safe');
let argv = require('./config/01-yargs').argv;
let porHacer = require('./por-hacer/01-por-hacer');
let comando = argv._[0]; //obtenemos el primer elemento del arreglo

//console.log(argv, comando);

switch (comando) {
  case 'listar':
    let listado = porHacer.getListado();
    for (let tarea of listado) {
      console.log(colors.green('************** Por Hacer *****************'));
      console.log(tarea.descripcion);
      console.log('Estado:', tarea.completado);
      console.log(colors.green('******************************************'));
    }

    break;
  case 'crear':
    let crear = porHacer.crear( argv.descripcion || argv.d );
    console.log(crear);
    break;
  case 'actualizar':
    let actualizado = porHacer.actualizar(argv.descripcion || argv.d, argv.completado || argv.c);
    console.log(actualizado);
    break;
  case 'borrar':
    let borrado = porHacer.borrar(argv.descripcion || argv.d);
    console.log(borrado);
    break;
  default:
    console.log('Comando inválido. Escriba "node 01-app --help" para mostrar la ayuda');
}
