import { createAction, createReducer } from '@reduxjs/toolkit'

const TOGGLE_THEME = 'theme/toggle'
const SET_THEME = 'theme/set'

export const toggleTheme = createAction(TOGGLE_THEME)

export const setTheme = createAction(SET_THEME)

export default createReducer('light', (builder) =>
  builder
    .addCase(toggleTheme, (state) => {
      return state === 'light' ? 'dark' : 'light'
    })
    .addCase(setTheme, (state, action) => {
      return action.payload
    })
)
