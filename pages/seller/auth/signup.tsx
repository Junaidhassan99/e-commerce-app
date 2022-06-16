import Link from "next/link";
import Card from "../../../components/card";
import { UserType } from "../../../utilities/enum";

const SellerSignUpScreen = () => {
  async function signupSubmitHandler(event: any) {
    event.preventDefault();

    console.log("Signup submit");

    const email = event.target.email.value;
    const password = event.target.password.value;
    const shopname = event.target.shopname.value;
    const address = event.target.address.value;
    const mobile = event.target.mobile.value;

    console.log(email);
    console.log(password);
    console.log(shopname);
    console.log(address);
    console.log(mobile);

    const sellerSignupData = {
      data: {
        email,
        password,
        shopname,
        address,
        mobile,
      },
      userType: UserType.Seller,
    };

    //post signup data
    const responsePost = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sellerSignupData),
    });

    //test response
    const dataPost = await responsePost.json();
    console.log(dataPost);
  }

  return (
    <div>
      <div className="grid place-items-center h-screen">
        <Card additionClasses="px-10">
          <div className="flex flex-col items-center">
            <div className="p-3 font-bold text-xl">Signup</div>
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
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="shopname">
                  Shop Name
                </label>
                <input
                  id="shopname"
                  type="text"
                  placeholder="Type your shop name"
                  className="outline-0 border-b-2 w-60"
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
            </form>
            <div className="p-3">
              <button
                type="submit"
                form="signup-form"
                value="Submit"
                className="primary-color py-1 px-24 rounded-lg"
              >
                Signup
              </button>
            </div>
            <div className="p-3">
              <Link href="/seller/auth/login">
                <a>Or Login</a>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SellerSignUpScreen;
