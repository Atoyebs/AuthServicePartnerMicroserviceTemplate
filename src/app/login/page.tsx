import LoginComponent from "./client";

export default async function Login() {

  return (
    <div className="flex flex-col items-center mt-[7rem]">
      <h1> Login Page </h1>
      <LoginComponent />
    </div>
  );
}