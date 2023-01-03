import produce from 'immer'
import { selectFreelances } from '../utils/selectors'

// Le state initial de la feature freelances
const initialState = {
  // le statut permet de suivre l'état de la requête
  status: 'void',
  // les données lorsque la requête a fonctionné
  data: null,
  // l'erreur lorsque la requête échoue
  error: null,
}

// Les noms des actions
const FETCHING = 'freelances/fetching'
const RESOLVED = 'freelances/resolved'
const REJECTED = 'freelances/rejected'

export const freelancesFetching = () => ({ type: FETCHING })
export const freelancesResolved = (data) => ({ type: RESOLVED, payload: data })
export const freelancesRejected = (error) => ({
  type: REJECTED,
  payload: error,
})

export default function freelancesReducer(state = initialState, action) {
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

export async function fetchOrUpdateFreelances(store) {
  const status = selectFreelances(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(freelancesFetching())
  try {
    const response = await fetch('http://localhost:8000/freelances')
    const data = await response.json()
    store.dispatch(freelancesResolved(data))
  } catch (error) {
    store.dispatch(freelancesRejected(error))
  }
}
