import { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

export function useScrollToAnchor(
  contentRef: React.RefObject<HTMLIonContentElement>
) {
  const { pathname, hash } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (hash && contentRef.current) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);

      if (element && contentRef.current) {
        const elementOffsetTop =
          element.getBoundingClientRect().top + contentRef.current.scrollTop;
        contentRef.current.scrollToPoint(0, elementOffsetTop, 1000); // smooth scroll
      }
    }
  }, [hash, contentRef]);

  useEffect(() => {
    const clearHash = () => {
      if (window.location.hash !== '') {
        history.replace(pathname); // clear hash
      }
    };

    if (contentRef.current) {
      contentRef.current.addEventListener('ionScrollEnd', clearHash);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('ionScrollEnd', clearHash);
      }
    };
  }, [contentRef, history, pathname]);
}
