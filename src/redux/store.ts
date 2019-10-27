import { combineReducers, createStore } from 'redux'
import starship from './starship'

// Este projeto usa a metodologia Ducks para estruturar uma aplicação redux
// https://github.com/erikras/ducks-modular-redux
const rootReducer = combineReducers({
  starship,
})

const store = createStore(rootReducer)

export default store
