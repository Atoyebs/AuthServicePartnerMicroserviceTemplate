"use client"
import { menuItems } from "@/menu-items";
import Link from "next/link";
import { useState } from "react";
export default function LoginComponent() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const onLogin = async () => {
    setIsLoading(true);
    try {

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
      <div className="flex flex-row mt-[1.5rem] gap-[2rem]">
        {menuItems.map((item) => (
          <Link className="cursor-pointer underline text-blue-500" key={item.name} href={item.href}>
            {item.name}
          </Link>
        ))}
      </div>

    </div>
  );
}