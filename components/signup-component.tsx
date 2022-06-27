import Link from "next/link";
import { useState } from "react";
import { UserType } from "../utilities/enum";
import Card from "./card";

const SignUpComponent: React.FC<{
  userType: UserType;
}> = ({ userType }) => {
  const [errorText, setErrorText] = useState("");

  async function signupSubmitHandler(event: any) {
    event.preventDefault();

    console.log("Signup submit");

    const email = event.target.email.value;
    const password = event.target.password.value;
    const address = event.target.address.value;
    const mobile = event.target.mobile.value;

    let signupData: any;
    if (userType === UserType.Buyer) {
      //only for buyer
      const fullname = event.target.common1.value;

      //buyer
      signupData = {
        data: {
          email,
          password,
          fullname,
          address,
          mobile,
        },
        userType: UserType.Buyer,
      };
    } else {
      //only for seller
      const shopname = event.target.common1.value;

      //seller
      signupData = {
        data: {
          email,
          password,
          shopname,
          address,
          mobile,
        },
        userType: UserType.Seller,
      };
    }

    try {
      //post signup data
      const responsePost = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      //test response
      const dataPost = await responsePost.json();
      console.log(dataPost);

      setErrorText("");
    } catch (error) {
      setErrorText("Invalid field detected");
    }
  }

  return (
    <div>
      <div className="grid place-items-center h-screen">
        <Card additionClasses="px-10">
          <div className="flex flex-col items-center">
            <div className="p-3 font-bold text-2xl">
              Signup As {userType === UserType.Buyer ? "Buyer" : "Seller"}.
            </div>
            <form id="signup-form" onSubmit={signupSubmitHandler}>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Type your email"
                  className="outline-0 border-b-2 w-60"
                  required
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
                  minLength={8}
                  required
                ></input>
              </div>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="common1">
                  {userType === UserType.Buyer ? "Full Name" : "Shop Name"}
                </label>
                <input
                  id="common1"
                  type="text"
                  placeholder={`Type your ${
                    userType === UserType.Buyer ? "full name" : "shop name"
                  }`}
                  className="outline-0 border-b-2 w-60"
                  minLength={3}
                  maxLength={25}
                  required
                ></input>
              </div>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Type your address"
                  className="outline-0 border-b-2 w-60"
                  minLength={10}
                ></input>
              </div>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="mobile">
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="text"
                  placeholder="Type your mobile"
                  className="outline-0 border-b-2 w-60"
                ></input>
              </div>
              <div className="text-center text-sm text-red-600">
                {errorText}
              </div>
            </form>
            <div className="p-3">
              <button
                type="submit"
                form="signup-form"
                value="Submit"
                className="bg-red-600 py-1 px-24 rounded-lg text-slate-50 text-lg"
              >
                Signup
              </button>
            </div>
            <div className="p-3">
              <Link
                href={
                  userType === UserType.Buyer
                    ? "/buyer/auth/login"
                    : "/seller/auth/login"
                }
              >
                <a>Or Login</a>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpComponent;
