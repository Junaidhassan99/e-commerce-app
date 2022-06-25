import mongoose from "mongoose";

import Link from "next/link";
import Card from "../../../components/card";
import { UserType } from "../../../utilities/enum";

const SellerLogInScreen: React.FC<{
  stateData: boolean;
}> = ({ stateData }) => {
  async function loginSubmitHandler(event: any) {
    event.preventDefault();

    console.log("login submit");

    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email);
    console.log(password);

    console.log(stateData);

    //post signup data
    const responsePost = await fetch(
      `/api/auth/${email}/${password}/${UserType.Buyer}`
    );
    

    //test response
    const dataPost = await responsePost.json();
    console.log(dataPost);
  }

  return (
    <div>
      <div className="grid place-items-center h-screen">
        <Card additionClasses="px-10">
          <div className="flex flex-col items-center">
            <div className="p-3 font-bold text-xl">Login</div>
            <form id="login-form" onSubmit={loginSubmitHandler}>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Type your email"
                  className="outline-0 border-b-2 w-60"
                ></input>
              </div>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Type your password"
                  className="outline-0 border-b-2 w-60"
                ></input>
              </div>
            </form>
            <div className="p-3">
              <button
                type="submit"
                form="login-form"
                value="Submit"
                className="primary-color py-1 px-24 rounded-lg"
              >
                Login
              </button>
            </div>
            <div className="p-3">
              <Link href="/buyer/auth/signup">
                <a>Or Signup</a>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SellerLogInScreen;
