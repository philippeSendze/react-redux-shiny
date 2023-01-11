import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    toggle: (state) => {
      return state === 'light' ? 'dark' : 'light'
    },
    set: (state, action) => {
      return action.payload
    },
  },
})

const { actions, reducer } = themeSlice

export const { set, toggle } = actions

export default reducer
