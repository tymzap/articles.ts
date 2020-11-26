import {useDispatch, useSelector} from 'react-redux';

import {StoreState} from 'store';
import {setColorScheme, setIsHelloTourRead, AppStoreState} from 'store/app';

export const useAppSettings = () => {
  const dispatch = useDispatch();

  const {colorScheme, isHeroTourRead} = useSelector<
    StoreState, AppStoreState
  >((state) => state.app);

  return {
    colorScheme,
    isHeroTourRead,
    set: (options: Partial<AppStoreState>) => {
      if (options.colorScheme) {
        dispatch(setColorScheme(options.colorScheme));
      }
      if (options.isHeroTourRead) {
        dispatch(setIsHelloTourRead(options.isHeroTourRead));
      }
    }
  }
};
