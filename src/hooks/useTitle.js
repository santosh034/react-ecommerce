import { useEffect } from "react";

export const useTitle = (title) => {

    useEffect(() => {
        document.title = `${title} - BookNest`;
    }, [title]);

  return null;
}