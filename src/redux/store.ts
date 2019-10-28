import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import starship, { StarshipState } from './starship'
import ui, { UiState } from './ui'

// Este projeto usa a metodologia Ducks para estruturar uma aplicação redux
// https://github.com/erikras/ducks-modular-redux

export interface ReduxState {
  starship: StarshipState
  ui: UiState
}

const rootReducer = combineReducers<ReduxState>({
  starship,
  ui,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
