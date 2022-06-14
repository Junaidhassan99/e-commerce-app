import Card from "../../../components/card";

const SellerHomeScreen = () => {
  return (
    <div>
      <div className="grid place-items-center h-screen">
        <Card additionClasses='px-10'>
          <div className="flex flex-col items-center">
            <div className="p-3 font-bold text-xl">Login</div>
            <form id="login-form">
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="user-name">Username</label>
                <input
                  id="user-name"
                  type="text"
                  placeholder="Type your username"
                  className="outline-0 border-b-2"
                ></input>
              </div>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="text"
                  placeholder="Type your password"
                  className="outline-0 border-b-2"
                ></input>
              </div>
            </form>
            <div className="p-3">
              <button
                type="submit"
                form="login-form"
                value="Submit"
                className="primary-color py-1 px-14 rounded-lg"
              >
                Login
              </button>
            </div>
            <button className="p-3">Or Signup</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SellerHomeScreen;
