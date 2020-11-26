import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorScheme} from '@react-types/provider';

export type AppStoreState = {
  colorScheme: ColorScheme
  isHeroTourRead: boolean;
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    colorScheme: 'light',
    isHeroTourRead: false,
  } as AppStoreState,
  reducers: {
    setColorScheme: (
      state,
      action: PayloadAction<AppStoreState['colorScheme']>
    ) => ({
      ...state,
      colorScheme: action.payload
    }),
    setIsHelloTourRead: (
      state,
      action: PayloadAction<AppStoreState['isHeroTourRead']>
    ) => ({
      ...state,
      isHeroTourRead: action.payload
    })
  }
});

export const {
  setColorScheme,
  setIsHelloTourRead
} = appSlice.actions;

export default appSlice;
