import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });

      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200 border-2 rounded-md">
      <div>
        <img
          className="h-96 rounded-tl-md rounded-bl-md"
          src="/sign_up_png.png"
          alt="sign up"
        />
      </div>
      <div className="bg-white h-96 rounded-md flex items-center justify-center flex-col p-8">
        <div className="flex justify-start mb-2">
          <h1 className="text-xl font-semibold">Welcome Back!</h1>
        </div>
        <Input reference={usernameRef} type="text" placeholder="Username" />
        <Input reference={passwordRef} type="password" placeholder="Password" />
        <div className="w-full mt-4">
          <Button
            variant="primary"
            size="md"
            text="Signup"
            fullWidth={true}
            onClick={handleSignup}
          />
        </div>

        <div>
          <span className="text-xs">
            Already have an account?{" "}
            <span
              className="cursor-pointer hover:text-[#929DAD] underline"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign in
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <div className="bg-white h-96 rounded-md flex items-center justify-center flex-col p-8">
        <div className="flex justify-start mb-2">
          <h1 className="text-xl font-semibold">Welcome Back!</h1>
        </div>
        <Input reference={usernameRef} type="text" placeholder="Username" />
        <Input reference={passwordRef} type="password" placeholder="Password" />
        <div className="w-full mt-4">
          <Button
            variant="primary"
            size="md"
            text="Signin"
            fullWidth={true}
            onClick={handleSignin}
          />
        </div>
        <div>
          <span className="text-xs">
           Don't have an account?{" "}
            <span
              className="cursor-pointer hover:text-[#929DAD] underline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </span>
          </span>
        </div>
      </div>

      <div>
        <img
          className="h-96 rounded-tl-md rounded-bl-md"
          src="/sign_up_png.png"
          alt="sign up"
        />
      </div>
    </div>
  );
};
