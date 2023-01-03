import { selectSurvey } from '../utils/selectors'
import produce from 'immer'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

const FETCHING = 'survey/fetching'
const RESOLVED = 'survey/resolved'
const REJECTED = 'survey/rejected'

export const surveyFetching = () => ({ type: FETCHING })
export const surveyResolved = (data) => ({ type: RESOLVED, payload: data })
export const surveyRejected = (error) => ({
  type: REJECTED,
  payload: error,
})

export default function surveyReducer(state = initialState, action) {
  // on utilise immer pour changer le state
  return produce(state, (draft) => {
    // on fait un switch sur le type de l'action
    switch (action.type) {
      case FETCHING: {
        if (draft.status === 'void') {
          draft.status = 'pending'
          return
        }
        if (draft.status === 'rejected') {
          draft.error = null
          draft.status = 'pending'
        }

        if (draft.status === 'resolved') {
          draft.status = 'updating'
          return
        }
        return
      }

      case RESOLVED: {
        // si la requête est en cours
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.data = action.payload
          draft.status = 'resolved'
          return
        }
        return
      }

      case REJECTED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          // on passe en rejected, on sauvegarde l'erreur et on supprime les données
          draft.status = 'rejected'
          draft.error = action.payload
          draft.data = null
        }
        // sinon l'action est ignorée
        return
      }

      // Sinon (action invalide ou initialisation)
      default:
        // on ne fait rien (retourne le state sans modifications)
        return
    }
  })
}

export async function fetchOrUpdateSurvey(store) {
  const status = selectSurvey(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(surveyFetching())
  try {
    const response = await fetch('http://localhost:8000/survey')
    const data = await response.json()
    store.dispatch(surveyResolved(data))
  } catch (error) {
    store.dispatch(surveyRejected(error))
  }
}
