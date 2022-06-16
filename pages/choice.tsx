import mongoose from "mongoose";
import Link from "next/link";
import Card from "../components/card";

const HomeScreen = () => {
  return (
    <div>
      <div className="grid place-items-center h-screen">
        <Card additionClasses="px-10">
          <div className="flex flex-col items-center">
            <div className="p-3 font-bold text-xl">Login As</div>
            <div className="p-3">
              <Link href="/buyer/auth/login">
                <button className="primary-color py-1 px-24 rounded-lg">
                  <a>Buyer</a>
                </button>
              </Link>
            </div>
            <div className="p-3">- Or -</div>
            <div className="p-3">
              <Link href="/seller/auth/login">
                <button className="primary-color py-1 px-24 rounded-lg">
                  <a>Seller</a>
                </button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  await mongoose
    .connect(
      "mongodb+srv://junaidhassan:password000jh@cluster0.53cvgvs.mongodb.net/data?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => {
      console.log("Failed to Connected to MongoDB");
    });

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default HomeScreen;
