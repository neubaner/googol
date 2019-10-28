const SHOW_STARSHIP_MODAL = 'googol/starship/SHOW_STARSHIP_MODAL'
const CLOSE_STARSHIP_MODAL = 'googol/staship/CLOSE_STARSHIP_MODAL'

interface ShowStarshipModalAction {
  type: typeof SHOW_STARSHIP_MODAL
  index: number
}

interface CloseStarshipModalAction {
  type: typeof CLOSE_STARSHIP_MODAL
}

type UiAction = ShowStarshipModalAction | CloseStarshipModalAction

export interface UiState {
  isModalOpen: boolean
  starshipIndex: number
}

const initialState: UiState = {
  isModalOpen: false,
  starshipIndex: -1,
}

export default function reducer(
  state = initialState,
  action: UiAction
): UiState {
  switch (action.type) {
    case SHOW_STARSHIP_MODAL:
      return {
        isModalOpen: true,
        starshipIndex: action.index,
      }
    case CLOSE_STARSHIP_MODAL:
      return {
        isModalOpen: false,
        starshipIndex: -1,
      }
    default:
      return state
  }
}

export function showStarshipModal(index: number): ShowStarshipModalAction {
  return {
    type: SHOW_STARSHIP_MODAL,
    index,
  }
}

export function closeStarshipModal(): CloseStarshipModalAction {
  return {
    type: CLOSE_STARSHIP_MODAL,
  }
}
