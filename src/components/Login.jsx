"use client";

import React from "react";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  console.log({ session });

  const submitHandler = async (event) => {
    event.preventDefault();
    const SERVER = "http://localhost";
    const [username, password] = event.target.elements;
    // const response = await fetch(`http://localhost:5000/auth/login`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: username.value,
    //     password: password.value,
    //   }),
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    // });

    // const data = await response.json();
    // console.log(data);
    signIn("credentials", {
      username: username.value,
      password: password.value,
      redirect: false,
    });
  };

  return (
    <form
      className="flex flex-col gap-4 w-2/5 align-middle justify-center"
      onSubmit={submitHandler}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="Gendalf"
          required={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required={true} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit" size="md" className="w-fit">
        Submit
      </Button>
    </form>
  );
};

export default Login;
