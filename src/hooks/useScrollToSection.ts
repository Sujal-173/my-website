import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Returns a stable `scrollToSection(id)` function.
 * - If already on `/`, scrolls immediately.
 * - If on another route (e.g. /blog), navigates to `/` first,
 *   then scrolls after the route transition completes.
 */
export function useScrollToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => {
      const doScroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };

      if (location.pathname === "/") {
        doScroll();
      } else {
        navigate("/", { state: { scrollTo: id } });
      }
    },
    [navigate, location.pathname],
  );
}
