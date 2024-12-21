require('dotenv').config();
import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CloseIcon";
import { CreateContentModalProps } from "../interfaces/CreateContentModal";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from 'axios'

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export const CreateContentModal = ({
  open,
  onClose,
}: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  const handleAddContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${process.env.BACKEND_URL}/api/v1/content`, {
      link,
      type,
      title
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })

    onClose();

  };
  return (
    <div>
      {open && (
        <div>
          <div className="bg-slate-500 fixed top-0 left-0 w-screen h-screen opacity-60 flex justify-center items-center"></div>
          <div className=" fixed top-0 left-0 w-screen opacity-100 h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center">
              <div className="bg-white opacity-100 p-4 rounded-md">
                <div className="flex float-right">
                  <div className="cursor-pointer" onClick={onClose}>
                    <CrossIcon size="md" />
                  </div>
                </div>
                <div>
                  <Input reference={titleRef} type="text" placeholder="Title" />
                  <Input reference={linkRef} type="text" placeholder="Link" />
                </div>

                <h1 className="font-semibold mt-3 text-center">Select Type:</h1>
                <div className="flex justify-between m-4">
                  <Button
                    size="md"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    text="Youtube"
                    onClick={() => setType(ContentType.Youtube)}
                  />
                  <Button
                    size="md"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    text="Twitter"
                    onClick={() => setType(ContentType.Twitter)}
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleAddContent}
                    size="md"
                    variant="primary"
                    text="Submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
