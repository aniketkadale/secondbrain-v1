import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-purple-600 bg-white h-screen">
      <Navbar />

      <div className="min-w-96">
        <div className="hero flex flex-col gap-5 justify-center items-start mt-50">
          <div className="flex flex-col gap-2 p-20 m-50">
            <h1 className="font-poppins text-white text-6xl font-bold animate-pulse ease-in ">
              Your Digital Brain🧠
            </h1>
            <h2 className="font-poppins text-white text-2xl font-semibold">
              Never forget what matters most!
            </h2>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="m-20">
            <h2 className="font-poppins text-white text-xl font-bold">
              <Button
                size="md"
                variant="secondary"
                text="Get Started Today"
                onClick={() => {
                  navigate("/signup");
                }}
              />
            </h2>
          </div>
          <div className="text-center mr-16">
            <h2 className="font-poppins text-[#827BEC] text-2xl font-bold">
              A single space for everything you value online.
            </h2>
            <span className="font-poppins text-[#B6B2F4] text-md font-bold">
              Save your favorite YouTube videos, tweets, links, <br />
              documents, and more – all in one place.
            </span>
            <img src="/hero.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
