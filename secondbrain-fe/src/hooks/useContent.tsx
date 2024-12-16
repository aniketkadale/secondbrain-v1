import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useContent = () => {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.userContent);
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
