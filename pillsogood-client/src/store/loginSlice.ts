import { applyMiddleware } from 'redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

// let user =createSlice({
//     name:'state이름',
//     initialState:'값'
// })

interface IUser {
  email: string
  password: string
}
const initialState: IUser = {
  email: '',
  password: '',
}
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
  },
})

export const loginActions = { ...loginSlice.actions }

//state변경함수 export하는법
//actions 하면 state 변경함수들이 담김
