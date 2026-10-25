import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
}

export default useDocumentTitle;
