import axios from "axios";
import HorizontalMenuLinks from "../components/menu-bar";

const VerifyPage = async (props: { searchParams: Record<string, string> }) => {
  const { searchParams } = props;
  const token = searchParams?.token;

  if (!token) {
    return (
      <section className="flex flex-col h-full w-full justify-center items-center gap-4">
        <h2 className="capitalize mb-4">Verify page</h2>
        <h3 className="text-red-600">Invalid token</h3>
        <HorizontalMenuLinks />
      </section>
    );
  }

  try {
    await verifyUserAccount(token);
  } catch (error) {
    return (
      <section className="flex flex-col h-full w-full justify-center items-center gap-4">
        <h2 className="capitalize mb-4">Verify page</h2>
        <h3 className="text-red-600">Problem Verifying Account</h3>
        <HorizontalMenuLinks />
      </section>
    );
  }


  return (
    <section className="flex flex-col h-full w-full justify-center items-center gap-5">
      <h2 className="capitalize">Verify page</h2>
      <p>Congratulations you've been successfully verified!</p>
      <HorizontalMenuLinks />
    </section>
  );
};

const verifyUserAccount = async (token: string) => {
  const response = await axios.post(`${process.env.NEXT_SERVER_API_DOMAIN}/api/user/verify`, {
    token
  });

  return response;
};

export default VerifyPage;
