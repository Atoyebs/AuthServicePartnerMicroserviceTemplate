import UserClient from "./client";

export default async function User() {
  return <section>
    <h1>User Page</h1>
    <div>
      <UserClient />
    </div>
  </section>;
}