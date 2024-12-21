import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidbar";
import axios from "axios";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useContentTweets } from "../hooks/useContentTweets";
import { Card } from "../components/Card";

const Tweets = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { contents, refresh } = useContentTweets();
  

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/me`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        // console.log("User API Response:", res.data);
        setUsername(res.data.user.username || "User");
      } catch (error) {
        // console.log("user fetched failed...");
        setUsername("Guest");
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  async function handleShareBrain() {
    const res = await axios.post(
      `${process.env.BACKEND_URL}/api/v1/brain/share`,
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

export default Tweets;
