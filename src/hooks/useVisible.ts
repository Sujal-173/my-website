import { useRef, useEffect, useState } from "react";

/**
 * Returns a ref and a visibility state.
 * Uses IntersectionObserver to trigger visibility state to true
 * once the element is scrolled into view (threshold defaults to 0.2).
 */
export function useVisible(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}
