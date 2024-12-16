import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useContentTweets = () => {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/content/tweets`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response)
        setContents(response.data.tweets);
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
