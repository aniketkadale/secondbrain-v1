import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidbar";
import axios from "axios";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";
import { useContentYoutube } from "../hooks/useContentYoutube";

const Youtube = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { contents, refresh } = useContentYoutube();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/me`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
     
        setUsername(res.data.user.username || "User");
      } catch (error) {
        console.log("user fetched failed...");
        
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  async function handleShareBrain() {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/brain/share`,
      {
        share: true,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const shareUrl = `https://localhost:5173/${res.data.hash}`;
    alert(shareUrl);
  }

  return (
    <div>
      <Sidebar />

      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="flex justify-end gap-2 items-center">
          <Button
            onClick={handleShareBrain}
            variant="secondary"
            size="md"
            text="Share Brain"
            startIcon={<ShareIcon size="md" />}
          />
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            size="md"
            text="Add Content"
            startIcon={<PlusIcon size="sm" />}
          />
        </div>

        <div className="flex justify-start mx-16 items-center">
          <h2 className="text-3xl font-bold">
            Welcome <span className="text-xl text-gray-600">{username}</span>
          </h2>
        </div>
        <div className="flex gap-16 flex-wrap mx-16 my-5">
          {/* {JSON.stringify(contents)} */}
          {contents.map(({ _id, type, link, title }) => (
            <Card id={_id} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Youtube;
