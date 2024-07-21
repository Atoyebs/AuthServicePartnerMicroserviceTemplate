import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Login",
    href: "#"
  },
  {
    name: "Sign Up",
    href: "#"
  }
]

export default async function Home() {

  return (
    <div className="flex flex-col mt-[7rem]">
      <h1> Landing Page </h1>
      <div className="flex flex-col mt-[5rem] gap-7 items-center">
        {menuItems.map((item) => (
          <Link className="cursor-pointer underline text-blue-500" key={item.name} href={item.href}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
