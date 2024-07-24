"use client"
import { useState } from "react";
import HorizontalMenuLinks from "../components/menu-bar";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
export default function LoginComponent() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const response = await EmailPassword.signIn({
        formFields: [
          { id: "email", value: email },
          { id: "password", value: password }
        ]
      });
      console.log(`response in login: `, response);
      if (response.status === "OK") {
        setIsEnabled(false);
        alert("Login Successful. Click on a user page link to test route protection");
        window.location.href = "/user";
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col mt-[7rem]">
      <div className="flex-col gap-[2rem] w-[30vw]">
        <input
          placeholder="email"
          value={email}
          disabled={!isEnabled}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          disabled={!isEnabled}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        style={{ marginTop: "3rem", marginBottom: "1rem" }}
        className="flex-col justify-center items-center"
      >
        <button onClick={onLogin} disabled={isLoading || !isEnabled} style={{ width: "30vw" }}>
          Log In
        </button>
      </div>
      <HorizontalMenuLinks />

    </div>
  );
}