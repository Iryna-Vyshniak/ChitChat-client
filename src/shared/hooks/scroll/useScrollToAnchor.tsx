import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

export function useScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash === '') window.scrollTo(0, 0);
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          window.requestAnimationFrame(() =>
            element.scrollIntoView({
              block: 'start',
              inline: 'nearest',
              behavior: 'smooth',
            })
          );
        }
      }, 0);
    }
  }, [pathname, hash]);
}
