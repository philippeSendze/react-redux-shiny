import freelanceReducer from '../features/freelance'
import freelancesReducer from '../features/freelances'
import surveyReducer from '../features/survey'
import themeReducer from '../features/theme'
import resultsReducer from '../features/results'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    theme: themeReducer,
    freelances: freelancesReducer,
    freelance: freelanceReducer,
    survey: surveyReducer,
    results: resultsReducer,
  },
})
