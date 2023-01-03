import { combineReducers, createStore } from 'redux'
import freelanceReducer from '../features/freelance'
import freelancesReducer from '../features/freelances'
import surveyReducer from '../features/survey'
import themeReducer from '../features/theme'

const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// on utilise combineReducer pour faire
// fonctionner plusieurs reducers ensemble
const reducer = combineReducers({
  // le themeReducer est responsable de la propriété `theme` du state
  theme: themeReducer,
  freelances: freelancesReducer,
  freelance: freelanceReducer,
  survey: surveyReducer,
})

// on utilise le reducer créé avec combineReducers
// pour initialiser le store
// Pas besoin de passer de state initial
// car chaque reducer à son propre state initial
const store = createStore(reducer, reduxDevtools)

export default store
