import { useEffect, useCallback, RefObject } from "react";

interface UseIntersectionObserverProps {
  target: RefObject<HTMLElement>;
  onIntersect: () => void;
  enabled?: boolean;
}

export const useIntersectionObserver = ({ target, onIntersect, enabled = true }: UseIntersectionObserverProps) => {
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && enabled) {
        onIntersect();
      }
    },
    [onIntersect, enabled],
  );

  useEffect(() => {
    const element = target.current;
    if (!element || !enabled) return undefined;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: "0px 0px 400px 0px",
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [target, enabled, handleObserver]);
};
