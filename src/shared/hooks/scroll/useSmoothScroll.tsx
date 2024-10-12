import { useEffect, useRef } from 'react';

export const useSmoothScroll = (
  contentRef: React.RefObject<HTMLIonContentElement>,
  speed: number = 0.08
) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  let offset = 0;

  const smoothScroll = (scrollTop: number) => {
    // Calculate smoothness to avoid jumps
    offset += (scrollTop - offset) * speed;

    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateY(-${offset}px) translateZ(0)`;
    }
  };

  const onScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;
    requestAnimationFrame(() => smoothScroll(scrollTop));
  };

  useEffect(() => {
    const currentContent = contentRef.current;
    if (currentContent) {
      currentContent.addEventListener('ionScroll', onScroll);

      return () => {
        currentContent.removeEventListener('ionScroll', onScroll);
      };
    }
  }, [contentRef]);

  return { scrollRef };
};
