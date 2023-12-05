import { Property } from './../../types/properties';
import { createSlice } from '@reduxjs/toolkit'
import { data } from "../../data/properties";

interface State {
  properties: Property[]
}


const slice = createSlice({
  name: 'properties',
  initialState: {
    properties: data
  } as State,
  reducers: {
    
  }
})

// export const {  } = slice.actions

export default slice.reducer


