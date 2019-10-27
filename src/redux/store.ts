import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import starship, { StarshipState } from './starship'

// Este projeto usa a metodologia Ducks para estruturar uma aplicação redux
// https://github.com/erikras/ducks-modular-redux

export interface ReduxState {
  starship: StarshipState
}

const rootReducer = combineReducers<ReduxState>({
  starship,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
