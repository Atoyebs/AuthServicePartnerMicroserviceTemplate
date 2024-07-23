import { UserInfo } from "./page";

export default function UserClient(props: UserInfo) {
  return <section className="flex flex-col justify-center items-center">
    <p><span className="font-semibold">First Name</span>: <span className="text-purple-600 font-semibold">{props.firstname}</span></p>
    <p><span className="font-semibold">Last Name</span>: <span className="text-purple-600 font-semibold">{props.lastname}</span></p>
    <p><span className="font-semibold">Email</span>: <span className="text-purple-600 font-semibold">{props.email}</span></p>
  </section>;
}