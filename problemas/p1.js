/**
 * Problema número 1.
 *
 * Necesitamos que obtengas los datos de ./src/input-p1.json y generes funciones que permitan:
 *
 * 1. Retornar todos los nodos que no tienen hijos.
 * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
 * 3. Contabilizar la cantidad de nodos totales
 * 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
 */

const data = require('./src/input-p1.json')
// console.log(JSON.stringify(data))

let newData = data.hijos.map((nodo) => nodo.hijos)
// .map((nodo) => nodo.hijos)[15]
// .map((nodo) => nodo.hijos)[0]

// console.log(newData)

// * 1. Retornar todos los nodos que no tienen hijos.
function nodosSinHijos(arr) {
  let nodosSinHijos = []
  // Funcion Recursiva
  function findHijos(sede) {
    sede.map((nodo) => {
      if (nodo.hijos.length !== 0) findHijos(nodo.hijos)
      else nodosSinHijos.push(nodo)
    })
  }
  // Llamar funcion Recursiva
  arr.forEach((sede) => findHijos(sede))
  return nodosSinHijos
}
// TEST
console.log(nodosSinHijos(newData))

// * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
function nodosConHijosParametrizable(arr, cantidadDeHijos) {
  let nodosConHijos = []
  // Funcion Recursiva
  function findHijos(sede) {
    sede.map((nodo) => {
      if (nodo.hijos.length === cantidadDeHijos) nodosConHijos.push(nodo)
      if (nodo.hijos.length !== 0) findHijos(nodo.hijos)
    })
  }
  // Llamar funcion Recursiva
  arr.forEach((sede) => findHijos(sede))
  return nodosConHijos
}
// TEST
console.log(nodosConHijosParametrizable(newData, 2))

// 3. Contabilizar la cantidad de nodos totales
function contabilizarNodos(arr) {
  let cantidadDeNodos = 0
  // Funcion Recursiva
  function contarNodos(sede) {
    sede.map((nodo) => {
      if (nodo.hijos.length !== 0) contarNodos(nodo.hijos)
      cantidadDeNodos = cantidadDeNodos + 1
    })
  }
  // Llamar funcion Recursiva
  arr.forEach((sede) => contarNodos(sede))
  // Retornar el array
  return cantidadDeNodos
}
// TEST
console.log(contabilizarNodos(newData))

// 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
function encontrarSedes(data) {
  // Crear array de respuesta
  let sedesQueCumplen = []
  // Funcion Recursiva y pasar nombre de Sede
  function recorrerNodos(sede, nombreSede) {
    sede.map((nodo) => {
      if (nodo.nombre === '4 Medio') recorrerNodos(nodo.hijos, nombreSede)
      if (nodo.nombre === 'A') recorrerNodos(nodo.hijos, nombreSede)
      if (nodo.nombre === 'Tecnología') sedesQueCumplen.push(nombreSede)
    })
  }
  // Llamar la funcion Recursiva
  data.hijos.map((sede) => recorrerNodos(sede.hijos, sede.nombre))
  // Retornar el array
  return sedesQueCumplen
}
// TEST
console.log(encontrarSedes(data))
