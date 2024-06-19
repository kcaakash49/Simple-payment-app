import { useState } from "react";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputBox from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BottomContent from "../components/BottomContent";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex h-screen justify-center bg-[#737373]">
      <div className="h-max flex flex-col m-40 bg-white p-4 rounded-lg w-80">
        <Header text="Sign In" />
        <SubHeader text="Enter your credentials to access your account" />
        <InputBox
          label="Username"
          placeholder="kcaakash@example.com"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputBox
          label="Password"
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label="Sign Up"
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/users/signin",
              {
                username,
                password,
                
              }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
        />
        <BottomContent
          label="Don't have an account?"
          text="Sign up"
          to="/signup"
        />
      </div>
    </div>
  );
};

export default SignIn;
