const { createStore } = require('redux');
const contador = require('./reducer');
const { incremento, decremento } = require('./actions');

// En esta linea creamos nuestro store. Pasandole como parametro nuestro Reducer

// al store se le pasa un unico reducer
// si tuviesemos mas de un reducer, se los pasamos como parametro a 
// combineReducer(), guardamos la funcion en una let, y luego pasamos esta
// variable como parametro del store.

var store = createStore(contador);

// Obtenemos el elemento con el id `valor`.

// traemos el id del html
var valor = document.getElementById("valor");

// Esta funcion nos va a servir para actualizar nuestro DOM con el valor que tengamos en nuestro Store.
// En el primer render y cada vez que nos subscribamos al Store.
// Utilizamos el elemento obtenido arriba para mostrar el State.
function renderContador() {
  // Obtenemos la propiedad 'contador' de nuestro store:
  let currentCount = store.getState().contador;
  // Seteamos el numero obtenido como texto dentro del elemento con id 'valor':
  valor.innerText = currentCount;
}

// Ejecutamos la funcion 'renderContador':
renderContador()

// Nos subscribimos al store pasandole la misma funcion. Asi cada vez que llegue una accion, ejecutamos la funcion:
store.subscribe(renderContador);

// Por ultimo, utilizamos los botones de nuestro HTML para que cada vez que hagamos click,
// hagan un dispatch al store de la accion correspondiente:

let incrementar = () => store.dispatch(incremento())
let decrementar = () => store.dispatch(decremento())
let incrementarImpar = () => {
  store.getState().contador % 2 !== 0 && store.dispatch(incremento())
} 
let incrementarAsync = () => {
  setTimeout(()=>{store.dispatch(incremento())}, 1000)
}

document.getElementById("incremento").onclick = incrementar
document.getElementById("decremento").onclick = decrementar
document.getElementById("incrementoImpar").onclick = incrementarImpar
document.getElementById("incrementoAsync").onclick = incrementarAsync

/* 
PASOS:
1 Creo un estado inicial
2 Creo un reducer con un state que por defecto tenga el valor del estado inicial y una action
3 Creo las action creator (incremento y decremento) que retornen las action
4 Describo los cambios que debería hacer el reducer contador, según el type que reciba
5 Creo el store que recibe como parametro un único reducer
6 Cada vez que modificamos el estado, tiene que cambiarse el valor de pantalla, por lo que
necesito traerme el id del html del valor, para setearlo con el mismo valor del contador.
Esto lo hace la function renderContador.
7 Defino subscribe para que cada vez que escuche un cambio de state, ejecute a renderContador, 
y así actualice lo que se ve en pantalla.
8 Por último, tengo que hacer que por cada click en + o - se ejecute incremento o decremento.

RECORRIDO (con +): 
Cada vez que se hace click en +, es como un pedido de modificacion, se ejecuta incrementar,
por lo que se ejecuta dispatch, que de alguna manera despacha a la function incremento 
(action creators), que devuelve la action, que tiene el cambio a realizar.
Va al reducer junto con el estado, en el reducer se recibe el pedido de 
cambio de estado y se ejecuta. Luego se devuelve el estado. Al hacer esta modificación
de estado, se ejecuta subscribe, quien ejecuta al renderContador y este se encarga
de mostrar en pantalla el nuevo valor.

RECORRIDO (con -): 
Cada vez que se hace click en -, es como un pedido de modificacion, se ejecuta decrementar,
por lo que se ejecuta dispatch, que de alguna manera despacha a la function decremento 
(action creators), que devuelve la action, que tiene el cambio a realizar.
Va al reducer junto con el estado, en el reducer se recibe el pedido de 
cambio de estado y se ejecuta. Luego se devuelve el estado. Al hacer esta modificación
de estado, se ejecuta subscribe, quien ejecuta al renderContador y este se encarga
de mostrar en pantalla el nuevo valor.

*/