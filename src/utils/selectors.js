//Ces selectors sont utilisés avec le hook useSelector
export const selectTheme = (state) => state.theme

export const selectFreelances = (state) => state.freelances

const voidFreelance = { status: 'void' }

export const selectFreelance = (freelanceId) => (state) => {
  return state.freelance[freelanceId] ?? voidFreelance
}

export const selectSurvey = (state) => state.survey

export const selectResults = (state) => state.results
