export const initialState =[]
export const OPTIONS = {
  'ADD': 'ADD',
  'REMOVE': 'REMOVE',
  'DELETE': 'DELETE',
  'UPDATE': 'UPDATE'
}
export const reducer = (state, action) => {
  switch(action.type){
    case OPTIONS.ADD:
      return [...state, action.payload]
    case OPTIONS.REMOVE:
      return state.filter( item => item.id !== action.payload.id) 
    case OPTIONS.UPDATE:
      return state.map( item => item.id === action.payload.id ? {...item, ...action.payload} : item)
    default:
      return state;
  }
}