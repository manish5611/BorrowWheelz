import { useEffect } from "react";

const PageTitle = ({ title, children }) => {
  useEffect(() => {
    document.title = title ? `${title} | BW` : "BW";
  }, [title]);

  return children;
};

export default PageTitle;
