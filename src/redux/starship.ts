import { ThunkAction } from 'redux-thunk'
import { SWAPIResponse, Starship, searchStarships } from '../api'

const REQUEST_STARSHIPS = 'googol/starship/REQUEST_STARSHIPS'
const RECEIVE_STARSHIPS = 'googol/starships/RECEIVE_STARSHIPS'
const REQUEST_STARSHIPS_NEXT_PAGE =
  'googol/startship/REQUEST_STARSHIPS_NEXT_PAGE'
const RECEIVE_STARSHIPS_NEXT_PAGE =
  'googol/startship/RECEIVE_STARSHIPS_NEXT_PAGE'
const SET_SEARCH_TERM = 'googol/starships/SET_SEARCH_TERM'
const STARSHIPS_ERROR = 'googol/starships/STARSHIPS_ERROR'

interface RequestStarshipsAction {
  type: typeof REQUEST_STARSHIPS
  searchTerm: string
}

interface ReceiveStarshipsAction {
  type: typeof RECEIVE_STARSHIPS
  response: SWAPIResponse<Starship>
}

interface RequestStarshipsNextPageAction {
  type: typeof REQUEST_STARSHIPS_NEXT_PAGE
}

interface ReceiveStarshipsNextPageAction {
  type: typeof RECEIVE_STARSHIPS_NEXT_PAGE
  response: SWAPIResponse<Starship>
}

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM
  searchTerm: string
}

interface StarshipsError {
  type: typeof STARSHIPS_ERROR
  error: string
}

type StarshipActions =
  | RequestStarshipsAction
  | ReceiveStarshipsAction
  | RequestStarshipsNextPageAction
  | ReceiveStarshipsNextPageAction
  | SetSearchTermAction
  | StarshipsError

export interface StarshipState {
  page: number
  doHaveNextPage: boolean
  isFetching: boolean
  searchTerm: string
  items: Starship[]
  error: string | null
}

type ThunkResult<T> = ThunkAction<T, StarshipState, undefined, any>

const initialState: StarshipState = {
  page: 1,
  doHaveNextPage: false,
  searchTerm: '',
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
        page: 1,
      }
    case RECEIVE_STARSHIPS:
      return {
        ...state,
        isFetching: false,
        doHaveNextPage: action.response.next !== null,
        items: action.response.results,
        page: state.page + 1,
      }
    case STARSHIPS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REQUEST_STARSHIPS_NEXT_PAGE:
      return {
        ...state,
        isFetching: true,
      }
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      }
    case RECEIVE_STARSHIPS_NEXT_PAGE:
      return {
        ...state,
        isFetching: false,
        doHaveNextPage: action.response.next !== null,
        page: state.page + 1,
        items: [...state.items, ...action.response.results],
      }
    default:
      return state
  }
}

export function requestStarships(searchTerm: string): RequestStarshipsAction {
  return {
    type: REQUEST_STARSHIPS,
    searchTerm,
  }
}

export function receiveStarships(
  response: SWAPIResponse<Starship>
): ReceiveStarshipsAction {
  return {
    type: RECEIVE_STARSHIPS,
    response,
  }
}

export function receiveStartshipsError(error: string): StarshipsError {
  return {
    type: STARSHIPS_ERROR,
    error,
  }
}

export function requestStarshipsNextPage(): RequestStarshipsNextPageAction {
  return {
    type: REQUEST_STARSHIPS_NEXT_PAGE,
  }
}

export function receiveStarshipsNextPage(
  response: SWAPIResponse<Starship>
): ReceiveStarshipsNextPageAction {
  return {
    type: RECEIVE_STARSHIPS_NEXT_PAGE,
    response,
  }
}

export function setSearchTerm(searchTerm: string): SetSearchTermAction {
  return {
    type: SET_SEARCH_TERM,
    searchTerm,
  }
}

export const fetchStarships = (
  searchTerm: string
): ThunkResult<void> => async dispatch => {
  dispatch(requestStarships(searchTerm))

  try {
    const response = await searchStarships(searchTerm)
    dispatch(receiveStarships(response))
  } catch (err) {
    dispatch(receiveStartshipsError(err.message))
  }
}

export const fetchStarshipsNextPage = (
  searchTerm: string,
  page: number
): ThunkResult<void> => async dispatch => {
  if (page !== null) {
    dispatch(requestStarshipsNextPage())

    try {
      const response = await searchStarships(searchTerm, page)
      dispatch(receiveStarshipsNextPage(response))
    } catch (err) {
      dispatch(receiveStartshipsError(err.message))
    }
  }
}
