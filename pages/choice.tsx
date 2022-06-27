import mongoose from "mongoose";
import Link from "next/link";
import Card from "../components/card";

const HomeScreen = () => {
  return (
    <div>
      <div className="grid place-items-center h-screen">
        <Card additionClasses="px-10">
          <div className="flex flex-col items-center">
            <div className="p-3 font-bold text-2xl">Login As.</div>
            <div className="p-3">
              <Link href="/buyer/auth/login">
                <button className="bg-red-600 py-1 px-24 rounded-lg text-slate-50 text-lg">
                  <a>Buyer</a>
                </button>
              </Link>
            </div>
            <div className="p-3">- Or -</div>
            <div className="p-3">
              <Link href="/seller/auth/login">
                <button className="bg-red-600 py-1 px-24 rounded-lg text-slate-50 text-lg">
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

export default HomeScreen;
