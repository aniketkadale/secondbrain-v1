import { useEffect, useState } from "react";
import axios from "axios";

export const useContentYoutube = () => {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios
      .get(`${process.env.BACKEND_URL}/api/v1/content/youtube`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response)
        setContents(response.data.youtube);
      });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 1 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return { contents, refresh };
};
