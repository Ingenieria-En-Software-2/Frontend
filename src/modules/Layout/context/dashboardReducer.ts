interface DashboardLayoutSubStateInterface {
  [key: string]: boolean | string | number
}

interface Action {
  type: string,
  payload?: any
}

export const asideMenuReducer = (state: DashboardLayoutSubStateInterface, action:Action) => {
  switch (action.type) {
    case 'TOGGLE_COLLAPSE':
      return {
        ...state,
        collapse: !state.collapse
      }
    case 'COLLAPSE':
      return {
        ...state,
        collapse: true
      }
    case 'UNCOLLAPSE':
      return {
        ...state,
        collapse: false
      }
    default:
      return state;
  }
}