import { cookies } from "next/headers";
import UserClient from "./client";
import axios from "axios";
import { EnvHandler, JWTHandler } from "supertokens-jwt-helper";
import HorizontalMenuLinks from "../components/menu-bar";

export type UserInfo = {
  firstname: string;
  lastname: string;
  email: string;
  sub: string; //the user's id
}

export default async function User() {
  const { data: userInfo } = await getSessionUserInfo();

  const userData = userInfo.data as UserInfo & any;

  return (
    <section className="flex flex-col h-full w-full justify-center items-center gap-4">
      <h1>User Page</h1>
      <div className="mb-8">
        <UserClient {...userData} />
      </div>
      <HorizontalMenuLinks />
    </section>
  );
}

const getSessionUserInfo = async () => {

  const sAccessToken = cookies().get('sAccessToken')?.value || "";
  EnvHandler.getInstance().setEnvs(process.env);

  const jwtHandler = JWTHandler.getInstance();
  const [jwt] = await jwtHandler.getVerifiedJWT({ name: "test" }, 1);

  const response = await axios.post(
    `${process.env.NEXT_SERVER_API_DOMAIN}/api/user/info`,
    {
      token: sAccessToken
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
};
