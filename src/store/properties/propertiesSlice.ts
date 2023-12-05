import { Property } from "./../../types/properties";
import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../data/properties";

interface State {
  properties: Property[];
}

const slice = createSlice({
  name: "properties",
  initialState: {
    properties: data,
  } as State,
  reducers: {
    updateProperty: (state, action) => {
      const targetIndex = state.properties.findIndex((e) => {
        return e.id === action.payload.id;
      });
      if (targetIndex > 0) {
        state.properties[targetIndex] = {
          ...state.properties[targetIndex],
          ...action.payload.values,
        };
      }
    },
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter(
        (e) => e.id !== action.payload.id
      );
    },
    changePropertyStatus: (state, action) => {
      const targetIndex = state.properties.findIndex((e) => e.id === action.payload.id);
      if (targetIndex > 0) {
        state.properties[targetIndex].status = action.payload.status;
      }
    }
  },
});

export const { updateProperty, deleteProperty, changePropertyStatus } = slice.actions;

export default slice.reducer;
