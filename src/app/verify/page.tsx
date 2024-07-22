import axios from "axios";
import Link from "next/link";
import HorizontalMenuLinks from "../components/menu-bar";

const VerifyPage = async (props: { searchParams: Record<string, string> }) => {
  const { searchParams } = props;
  const token = searchParams?.token;

  console.log(`token from search params = `, token);

  if (!token) {
    return (
      <section className="flex flex-col h-full w-full justify-center items-center gap-4">
        <h2 className="capitalize mb-4">Verify page</h2>
        <h3 className="text-red-600">Invalid token</h3>
        <HorizontalMenuLinks />
      </section>
    );
  }

  const { data } = await verifyUserAccount(token);

  console.log(`data returned from verifyUserAccount: `, data);

  return (
    <section className="flex flex-col h-full w-full justify-center items-center gap-5">
      <h2 className="capitalize">Verify page</h2>
      <p>Congratulations you've been successfully verified!</p>
      {/* <div>User data: {JSON.stringify(rest)}</div> */}

      <HorizontalMenuLinks />
    </section>
  );
};

const verifyUserAccount = async (token: string) => {
  const { data } = await axios.post(`${process.env.NEXT_SERVER_API_DOMAIN}/api/user/verify`, {
    token
  });

  return data;
};

export default VerifyPage;
