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
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <div className="bg-white rounded-md min-w-48 flex items-center justify-center flex-col p-8">
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
      <div className="bg-white rounded-md min-w-48 flex items-center justify-center flex-col p-8">
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
      </div>
    </div>
  );
};
