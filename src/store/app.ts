import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorScheme} from '@react-types/provider';

export type AppStoreState = {
  colorScheme: ColorScheme
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    colorScheme: 'light'
  } as AppStoreState,
  reducers: {
    setColorScheme: (
      state,
      action: PayloadAction<AppStoreState['colorScheme']>
    ) => ({
      ...state,
      colorScheme: action.payload
    })
  }
});

export const {
  setColorScheme
} = appSlice.actions;

export default appSlice;
