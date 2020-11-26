import {useEffect, useState} from 'react';

const useIsImageLoaded = (src: string): boolean => {
  let image: HTMLImageElement | null = document.createElement('img');
  image.src = src;

  const [isImageLoaded, setIsImageLoaded] = useState(
    image.complete || (image.width + image.height) > 0
  );

  useEffect(() => {
    if (!isImageLoaded) {
      (image as HTMLImageElement).addEventListener(
        'load',
        () => {
          image = null;
          setIsImageLoaded(true);
        },
        {once: true}
      );
    }
  }, []);

  return isImageLoaded;
};

export default useIsImageLoaded;
