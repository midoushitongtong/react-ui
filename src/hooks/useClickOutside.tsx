import React from 'react';

const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  const listener = React.useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        handler();
      }
    },
    [ref, handler]
  );

  React.useEffect(() => {
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  });
};

export default useClickOutside;
