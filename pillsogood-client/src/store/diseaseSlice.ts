import { applyMiddleware } from 'redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const middleware = [thunk]

type typeDisease = {
  label: string
  value: string
}

interface IDisease {
  disease: typeDisease[]
}
const initialState: IDisease = {
  disease: [],
}

export const diseaseSlice = createSlice({
  name: 'disease',
  initialState,
  reducers: {
    setDisease: (state, action) => {
      state.disease = action.payload
    },
  },
})

export const diseaseActions = { ...diseaseSlice.actions }
