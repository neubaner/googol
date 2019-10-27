import { ThunkAction } from 'redux-thunk'
import { SWAPIResponse, Starship, searchStarships } from '../api'

const REQUEST_STARSHIPS = 'googol/starship/REQUEST_STARSHIPS'
const RECEIVE_STARSHIPS = 'googol/starships/RECEIVE_STARSHIPS'
const RECEIVE_STARSHIPS_ERROR = 'googol/starships/RECEIVE_STARSHIPS_ERROR'

interface RequestStarshipAction {
  type: typeof REQUEST_STARSHIPS
}

interface ReceiveStarshipAction {
  type: typeof RECEIVE_STARSHIPS
  response: SWAPIResponse<Starship>
}

interface ReceiveStarshipErrorAction {
  type: typeof RECEIVE_STARSHIPS_ERROR
  error: string
}

type StarshipActions =
  | RequestStarshipAction
  | ReceiveStarshipAction
  | ReceiveStarshipErrorAction

interface StarshipState {
  nextUrl: string | null
  isFetching: boolean
  items: Starship[]
  error: string | null
}

type ThunkResult<T> = ThunkAction<T, StarshipState, undefined, any>

const initialState: StarshipState = {
  nextUrl: null,
  isFetching: false,
  items: [],
  error: null,
}

export default function reducer(
  state = initialState,
  action: StarshipActions
): StarshipState {
  switch (action.type) {
    case REQUEST_STARSHIPS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_STARSHIPS:
      return {
        ...state,
        isFetching: false,
        items: action.response.results,
        nextUrl: action.response.next,
      }
    case RECEIVE_STARSHIPS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}

export function requestStarships(): RequestStarshipAction {
  return {
    type: REQUEST_STARSHIPS,
  }
}

export function receiveStartships(
  response: SWAPIResponse<Starship>
): ReceiveStarshipAction {
  return {
    type: RECEIVE_STARSHIPS,
    response,
  }
}

export function receiveStartshipsError(
  error: string
): ReceiveStarshipErrorAction {
  return {
    type: RECEIVE_STARSHIPS_ERROR,
    error,
  }
}

export const fetchStarships = (
  searchTerm: string
): ThunkResult<void> => async dispatch => {
  dispatch(requestStarships())

  try {
    const response = await searchStarships(searchTerm)
    dispatch(receiveStartships(response))
  } catch (err) {
    dispatch(receiveStartshipsError(err.message))
  }
}
