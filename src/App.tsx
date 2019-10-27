import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'

const App: React.FC = () => <Provider store={store}></Provider>

export default App
