"use client";
import { menuItems } from "@/menu-items";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "supertokens-web-js/recipe/emailpassword";
import HorizontalMenuLinks from "../components/menu-bar";

const TUTORIAL_URL =
  "https://supertokens.com/docs/thirdpartyemailpassword/custom-ui/email-password-login";

export const SignupComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState("Ini");
  const [lastname, setLastname] = useState("Atoyebi");
  const [email, setEmail] = useState("volajel538@apn7.com");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  const onSignUp = async () => {
    setIsLoading(true);

    try {
      let response = await signUp({
        formFields: [
          { id: "email", value: email },
          { id: "password", value: password },
          { id: "firstname", value: firstname },
          { id: "lastname", value: lastname },
        ],
      });

      if (response.status === "FIELD_ERROR") {
        // one of the input formFields failed validaiton
        response.formFields.forEach((formField) => {
          if (formField.id === "email") {
            /* Email validation failed (for example incorrect email syntax),
            or the email is not unique. */
            alert(JSON.stringify(formField.error));
          } else if (formField.id === "password") {
            /* Password validation failed.
            Maybe it didn't match the password strength */
            alert(JSON.stringify(formField.error));
          }
        });
      } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
        /* 
          the reason string is a user friendly message
          about what went wrong. It can also contain a support code which users
          can tell you so you know why their sign up was not allowed.
        */
        alert(JSON.stringify(response.reason));
      } else {
        /*
           sign up successful. The session tokens are automatically handled by
           the frontend SDK.
        */
        alert(`Signup successful! Please verify your account!`);
      }
    } catch (error) {
      console.error(`sign up error: `, error);
      alert(error);
    }

    setIsLoading(false);
  };

  return (
    <section className="flex flex-col justify-center items-center h-full">

      <div style={{ gap: "1rem", width: "30vw" }} className="flex-col justify-center items-center">
        <input
          placeholder="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          placeholder="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div
        style={{ marginTop: "3rem", marginBottom: "1rem" }}
        className="flex-col justify-center items-center"
      >
        <button onClick={onSignUp} disabled={isLoading} style={{ width: "30vw" }}>
          SignUp
        </button>
      </div>

      <span className="mb-6">
        <Link href={TUTORIAL_URL} target="_blank">
          Click here for tutorial instructions
        </Link>
      </span>
      <HorizontalMenuLinks />
    </section>
  );
};
