import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      setLoading(true);

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
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-r from-purple-600">
      <div className="flex border-1 rounded-md shadow-2xl">
        <div>
          <img
            className="h-96 rounded-tl-md rounded-bl-md"
            src="/auth.png"
            alt="sign up"
          />
        </div>
        <div
          className=" h-96 rounded-tr-md rounded-br-md
       flex items-center justify-center flex-col p-8"
        >
          <div className="flex flex-col text-center font-poppins justify-start mb-2">
            <h1 className="text-2xl text-purple-600 font-bold">Sign Up</h1>
            <h1 className="text-xl ">Welcome Back!</h1>
          </div>
          <Input reference={usernameRef} type="text" placeholder="Username" />
          <Input
            reference={passwordRef}
            type="password"
            placeholder="Password"
          />
          <div className="w-full mt-4">
            <Button
              variant="primary"
              size="md"
              text={loading ? <Loading /> : "Signup"}
              fullWidth={true}
              onClick={handleSignup}
            />
          </div>

          <div>
            <span className="text-xs">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-blue-600 hover:text-blue-500 underline"
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
    </div>
  );
};

export const Signin = () => {
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      setLoading(true);
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
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-r from-purple-600">
      <div className="flex border-1 rounded-md shadow-2xl shadow-l-none">
        <div className=" h-96 rounded-tl-md rounded-bl-md flex items-center justify-center flex-col p-8">
          <div className="flex flex-col text-center font-poppins justify-start mb-2">
            <h1 className="text-2xl text-purple-600 font-bold">Sign In</h1>
            <h1 className="text-xl ">Welcome Back!</h1>
          </div>
          <Input reference={usernameRef} type="text" placeholder="Username" />
          <Input
            reference={passwordRef}
            type="password"
            placeholder="Password"
          />
          <div className="w-full mt-4">
            <Button
              variant="primary"
              size="md"
              text={loading ? <Loading /> : "Signin"}
              fullWidth={true}
              onClick={handleSignin}
            />
          </div>
          <div>
            <span className="text-xs">
              Don't have an account?{" "}
              <span
                className="cursor-pointer text-blue-600 hover:text-blue-500 underline"
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
            className="h-96 rounded-tr-md rounded-br-md"
            src="/auth.png"
            alt="sign up"
          />
        </div>
      </div>
    </div>
  );
};
