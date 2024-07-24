import { menuItems } from "@/menu-items";
import Link from "next/link";

const HorizontalMenuLinks = () => {
  return (
    <div className="flex flex-row justify-center mt-[1.5rem] gap-[2rem]">
      {menuItems.map((item) => (
        <Link className="cursor-pointer" key={item.name} href={item.href}>
          {item.name}
        </Link>
      ))}
    </div>
  )

}

export default HorizontalMenuLinks;