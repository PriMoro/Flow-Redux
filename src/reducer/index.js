const { INCREMENTO, DECREMENTO } = require('../action-types');

const initialState = {
  contador: 0
}

// Nuestro reducer que maneja nuestros dos casos de acción incremento y decremento.
// Recibe el estado de nuestro store, junto con una action creada por nuestro action creator. 
// ¿Qué tiene que hacer el reducer con el contador de cada caso?

function contador(state = initialState, action) {
  switch(action.type){
    case INCREMENTO:
      return {
        ...state, // hacemos una copia, ya que si hay mas propiedades
        // la copia del estado evita que se pisen
        contador: state.contador + 1
      }
    case DECREMENTO:
      return {
        ...state,
        contador: state.contador - 1
      } 
    // al tener el return no es necesario el break del switch
    default:
      return {...state}
  }
  
}

module.exports = contador;