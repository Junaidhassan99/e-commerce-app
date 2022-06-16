import mongoose from "mongoose";

import Link from "next/link";
import Card from "../../../components/card";

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

    // const responseGet = await fetch("/api/auth");
    // const dataGet = await responseGet.json();

    // console.log(dataGet);
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

// export async function getStaticProps() {
//   let stateData = false;

//   const dbAPI =
//     "mongodb+srv://junaidhassan:password000jh@cluster0.53cvgvs.mongodb.net/?retryWrites=true&w=majority";

//   await mongoose
//     .connect(dbAPI)
//     .then(() => {
//       console.log("connected successfully");
//       stateData = true;
//     })
//     .catch(() => {
//       console.log("connection Failed");
//     });

//   const schemaTest = new mongoose.Schema({ email: String });

//   const collectionTest = mongoose.model("collectionTest", schemaTest);

//   const docTest = new collectionTest({ email: "junaid@gmail.com" });

//   docTest.save();

//   return {
//     props: {
//       stateData,
//     },
//   };
// }

export default SellerLogInScreen;
