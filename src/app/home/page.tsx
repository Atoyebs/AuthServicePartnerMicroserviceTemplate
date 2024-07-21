
import axios from "axios";
import { JWTHandler, EnvHandler } from "supertokens-jwt-helper"

const sampleAuthApiEndpoint = async () => {
  EnvHandler.getInstance().setEnvs(process.env);

  const jwtHandler = JWTHandler.getInstance();
  const [jwt] = await jwtHandler.getVerifiedJWT({ name: "test" }, 1);
  const verificationEndpoint = "http://localhost:3000/api/service/test";
  const { data } = await axios.post(verificationEndpoint, {}, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }
  });
  return data;
};
export default async function Home() {

  const data = await sampleAuthApiEndpoint();

  return <h1>Home</h1>;
}