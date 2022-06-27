import Link from "next/link";
import store, { wrapper } from "../store/store";
import { UserType } from "../utilities/enum";
import Card from "./card";

import { useSelector, useDispatch } from "react-redux";
import { setAllAuthData } from "../store/auth-slice";
import { useRouter } from "next/router";

const LogInComponent: React.FC<{
  userType: UserType;
}> = ({ userType }) => {
  const dispatch = useDispatch();

  const allAuthData = useSelector((state: any) => state.auth);

  const router = useRouter();

  console.log(
    "🚀 ~ file: login-component.tsx ~ line 16 ~ allAuthData",
    allAuthData
  );

  async function loginSubmitHandler(event: any) {
    event.preventDefault();

    console.log("login submit");

    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email);
    console.log(password);

    let responseGet: any;

    if (userType === UserType.Buyer) {
      responseGet = await fetch(
        `/api/auth?email=${email}&password=${password}&userType=${UserType.Buyer}`
      );
    } else {
      responseGet = await fetch(
        `/api/auth?email=${email}&password=${password}&userType=${UserType.Seller}`
      );
    }

    const dataGet = await responseGet.json();

    console.log(
      "🚀 ~ file: login-component.tsx ~ line 41 ~ loginSubmitHandler ~ dataGet",
      dataGet
    );

    if (dataGet !== null && password === dataGet.password) {
      console.log("Correct Email and Password");

      //store auth data to state
      dispatch(setAllAuthData({ userType: userType, authData: dataGet }));

      if (userType === UserType.Buyer) {
        router.push("/buyer");
      } else {
        router.push("/seller");
      }
    } else {
      console.log("Incorrect Email or Password");
    }
  }

  return (
    <div>
      <div className="grid place-items-center h-screen">
        <Card additionClasses="px-10">
          <div className="flex flex-col items-center">
            <div className="p-3 font-bold text-2xl">
              Login As {userType === UserType.Buyer ? "Buyer" : "Seller"}.
            </div>
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
                  minLength={8}
                ></input>
              </div>
            </form>
            <div className="p-3">
              <button
                type="submit"
                form="login-form"
                value="Submit"
                className="bg-red-600 py-1 px-24 rounded-lg text-slate-50 text-lg"
              >
                Login
              </button>
            </div>
            <div className="p-3">
              <Link
                href={
                  userType === UserType.Buyer
                    ? "/buyer/auth/signup"
                    : "/seller/auth/signup"
                }
              >
                <a>Or Signup</a>
              </Link>
            </div>
            {/* <div>{allAuthData.authData!==undefined&&`${allAuthData.authData.mobile}`}</div> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LogInComponent;
