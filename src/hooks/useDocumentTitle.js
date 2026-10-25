/**
 * Small hook that keeps the browser tab title in sync with the current page.
 * Route components call it with page-specific text.
 */
import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
}

export default useDocumentTitle;
