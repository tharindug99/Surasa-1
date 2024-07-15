import { useEffect } from "react";
import { APP_NAME } from "configs/AppConfig";

const useDocumentTitle = (title) => {
  useEffect(() => {
    //document.title = `${title || ""} - ${APP_NAME}`;
    document.title = `${title} `;
  }, [title]);
};

export { useDocumentTitle };
