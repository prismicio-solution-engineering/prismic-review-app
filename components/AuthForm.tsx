"use client";
import { useState } from "react";
import { isFilled } from "@prismicio/client";
import { Button } from "./Button";
// import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { login, signup } from "../app/login/actions";

export const AuthForm = (data) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  // const { signIn, signUp, error } = useSupabaseAuth(); // Functions from your custom hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      const success = await signup({ email, password, name });
      if (success) {
        console.log(success)
        // Handle successful sign up, e.g., redirecting the user
      }
    } else {
      const success = await login({ email, password });
      if (success) {
        console.log(success)
        // Handle successful sign in
      }
    }
  };

  return (
    <div className="flex flex-col items-center my-16 bg-silver-light rounded-lg p-8 max-w-screen-xl mx-auto shadow-sm">
      <h3 className="text-2xl font-sans font-bold text-gray-darker mb-6">
        {isSignUp ? data.data.sign_up_title : data.data.sign_in_title}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6"
      >
        {isSignUp && (
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-gray-darker"
            >
              {isFilled.keyText(data.data.name_field_label)
                ? data.data.name_field_label
                : "Michel"}
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={
                isFilled.keyText(data.data.name_field_placeholder)
                  ? data.data.name_field_placeholder
                  : "Michel"
              }
              className="w-full p-4 text-gray-darker bg-white rounded-lg border-2 border-gray-darker"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-darker"
          >
            {isFilled.keyText(data.data.email_field_placeholder)
              ? data.data.email_field_placeholder
              : "Email"}
          </label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              isFilled.keyText(data.data.email_field_placeholder)
                ? data.data.email_field_placeholder
                : "Email"
            }
            className="w-full p-4 text-gray-darker bg-white rounded-lg border-2 border-gray-darker"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-darker"
          >
            {isFilled.keyText(data.data.password_field_placeholder)
              ? data.data.password_field_placeholder
              : "Password"}
          </label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder={
              isFilled.keyText(data.data.password_field_placeholder)
                ? data.data.password_field_placeholder
                : "Password"
            }
            className="w-full p-4 text-gray-darker bg-white rounded-lg border-2 border-gray-darker"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button submit color="black" variant="primary">
            {isSignUp
              ? data.data.sign_up_button_label
              : data.data.sign_in_button_label}
          </Button>
          <Button button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? data.data.switch_to_sign_in_text
              : data.data.switch_to_sign_up_text}
          </Button>
        </div>
      </form>
    </div>
  );
};
