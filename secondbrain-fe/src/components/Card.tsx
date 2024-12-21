import { useEffect } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CardProps } from "../interfaces/CardProps";
import { Button } from "./Button";
import axios from "axios";

declare global {
  interface Window {
    twttr?: any;
  }
}

export const Card = (props: CardProps) => {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        console.log("Twitter script loaded");
        if (window.twttr?.widgets) {
          window.twttr.widgets.load();
        }
      };
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }, [props.type, props.link]);

  const handleDeleteBrain = async () => {
    if (props.onDelete) props.onDelete(props.id);
    try {
      const response = await axios.delete(
        `${process.env.BACKEND_URL}/api/v1/content/${props.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response);

      if (props.onDelete) {
        props.onDelete(props.id);
      }

      alert("Brain deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete this brain");
    }
  };

  return (
    <div>
      <div className="p-8 bg-white min-h-72 min-w-69 max-w-69 border border-gray-200 rounded-md shadow-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 justify-center">
            <h1 className="text-lg font-semibold">{props.title}</h1>
          </div>

          <div className="flex items-center gap-2 mx-2 justify-center">
            {/* <div className="text-gray-500">
              <ShareIcon size="md" />
            </div> */}
            <div className="flex justify-center items-center  gap-4 text-gray-500">
              <ShareIcon size="md" />
              <Button
                variant="danger"
                size="sm"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteBrain}
              />
            </div>
          </div>
        </div>

        <div
          className="pt-3 flex"
          style={{ height: "300px", width: "100%", overflow: "hidden" }}
        >
          {props.type == "youtube" && (
            <iframe
              className="w-full flex justify-center rounded-md object-contain"
              src={props.link.replace("watch", "embed").replace("?v=", "/")}
              title={props.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {props.type == "twitter" && (
            <blockquote className="flex justify-center twitter-tweet w-full">
              <a href={props.link.replace("x", "twitter")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};
