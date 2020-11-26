import {useDispatch, useSelector} from 'react-redux';

import {StoreState} from 'store';
import {setColorScheme, AppStoreState} from 'store/app';

export const useColorScheme = () => {
  const dispatch = useDispatch();

  const colorScheme = useSelector<
    StoreState, AppStoreState['colorScheme']
  >((state) => state.app.colorScheme);

  return {
    colorScheme,
    setColorScheme: (colorScheme: AppStoreState['colorScheme']) => {
      dispatch(setColorScheme(colorScheme));
    }
  }
};
