import React from 'react'; ///////// Crear componenetes
import { render } from 'react-dom'; ///////// Renderizar los componenetes - ponerlos dentro del bnavegador
import Home from '../pages/containers/home';
// import Playlist from './src/playlist/components/playlist';
// import data from '../api.json';

// import data from '../schemas/index.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index';
import { Map as map } from 'immutable';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// function logger({ getState, dispatch }) {
//   return (next) => {
//     return (action) => {
//       console.log('vamos a enviar esta accion', action);
//       const value = next(action)
//       console.log('este es mi nuevo estado', getState().toJS());
//       return value
//     }
//   }
// }

const logger_ = ({getState, dispatch}) => next => action => {
  console.log('vamos a enviar esta accion', action);
  const value = next(action)
  console.log('este es mi nuevo estado', getState().toJS());
  return value
}

// console.log(normalizedData);


// const initialState = {
//   data: {
//     // ...data,
//     entities: data.entities,
//     categories: data.result.categories,
//     search: [],
//   },
//   modal: {
//     visibility: false,
//     mediaId: null,
//   }
// }

const store = createStore(
  reducer,
  map(),
  composeWithDevTools(
    applyMiddleware(logger, thunk)
  )
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

console.log(store.getState());

// ReactDOM.render(que voy a renderizar, donde lo haré);
const homeContainer = document.getElementById('home-container');
// const holaMundo = <h1>hola estudiao</h1>;
render(
  <Provider store={store}>
    <Home />
  </Provider>
, homeContainer);

// console.log("Hola mundo!");
