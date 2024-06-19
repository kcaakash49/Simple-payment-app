import { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomContent from "../components/BottomContent";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex h-screen justify-center bg-[#737373]">
      <div className="h-max flex flex-col m-40 bg-white p-4 rounded-lg w-80">
        <Header text="Sign Up" />
        <SubHeader text="Enter your information to create an account" />
        <InputBox
          label="First Name"
          placeholder="Aakash"
          onChange={(e) => setFirstName(e.target.value)}
          
        />
        <InputBox
          label="Last Name"
          placeholder="KC"
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputBox
          label="Username"
          placeholder="kcaakash@example.com"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputBox
          label="Password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label="Sign Up"
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/users/signup",
              {
                username,
                firstName,
                lastName,
                password,
              }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
        />
        <BottomContent
          label="Already have an account?"
          text="Sign in"
          to="/signin"
        />
      </div>
    </div>
  );
}

export default SignUp;
