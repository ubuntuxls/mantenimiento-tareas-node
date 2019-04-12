//Inicio de programa
let fs = require('fs');
let tareasPorHacer = [];

let guardarDB = () => {
  let data = JSON.stringify(tareasPorHacer);
  fs.writeFile('db/data.json', data, (err) => {
    if (err) {
      throw new Error('No se ha podido almacenar la información', err);
    }
  })
}

let cargarDB = () => {
  try {
    tareasPorHacer = require('../db/data.json');
  } catch (e) {
    tareasPorHacer = [];
  }
}

let crear = (descripcion) => {
  cargarDB();
  let porHacer = {
    descripcion,
    completado : false
  }
  tareasPorHacer.push( porHacer );
  guardarDB();
  return porHacer;
}

const getListado = () => {
  cargarDB();
  return tareasPorHacer;
}

const actualizar = (descripcion, completado) => {
  cargarDB();
  let index = tareasPorHacer.findIndex((tarea) => {
    if (tarea.descripcion === descripcion) {
      return tarea;
    }
  });

  if (index >= 0) {
    tareasPorHacer[index].completado = completado;
    guardarDB();
    return true;
  } else {
    return false;
  }
}

const borrar = (descripcion) => {
  cargarDB();
  let index = tareasPorHacer.findIndex((tarea) => {
    if (tarea.descripcion === descripcion) {
      return tarea;
    }
  });

  if (index >= 0) {
    tareasPorHacer.splice(index, 1);
    guardarDB();
    return true;
  } else {
    return false;
  }


/*
  //tambien podemos hacer lo mismo con filter, de esta otra manera
  let nuevoListado = tareasPorHacer.filter( (tarea) => { //filter devuelve un array con los elementos que no conincidan en la comparacion.
    return tarea.descripcion !== descripcion;
  });

  if (nuevoListado.length === tareasPorHacer.length) {
    return false;
  } else {
    tareasPorHacer = nuevoListado;
    guardarDB();
    return true;
  }
*/

}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
}
