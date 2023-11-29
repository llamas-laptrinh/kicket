"use client";
import Loader from "@/app/components/loader";
import { postData } from "@/app/utils/action";
import { CheckCircleIcon, CreditCardIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

export default function Page() {
  const [isLoading, setLoading] = React.useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const date = new Date();
    date.setDate(new Date().getDate() + 5);
    const res = await postData("/api/v1/tokens/mint-nft", {
      address: "0x3e45A0808D74a6Bb380A431660516559FE6ae988",
      name: "Jungle moosle",
      description: `due-date-${date.toDateString()}`,
    });
    console.log(res);
    setLoading(false);
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h2 className="text-2xl font-semibold">Order Summary</h2>
      <section>
        <Image
          width={200}
          height={50}
          className="w-full h-auto my-2"
          src="/ticket.png"
          alt="product"
        />
        <hgroup>
          <h3 className="text-sm text-gray-500">
            Jungle moosle x <span className="text-black">1</span>
          </h3>
          <p className="text-sm text-gray-500">
            Price: <span className="text-black">$200</span>
          </p>
        </hgroup>
      </section>
      <section className="my-4">
        <h2 className="text-md font-medium">Information</h2>
        <input
          className="border w-full my-2 px-4 py-2"
          placeholder="wallet address"
          type="text"
        />
      </section>
      <section>
        <h2 className="text-md font-medium">Payment Method</h2>

        <div className="flex border my-2 items-center">
          <div className="flex items-center px-4 py-2 flex-1">
            <CreditCardIcon className="w-4 h-4 mr-6 text-gray-400" />
            <p className="text-gray-400">Credit or debit card</p>
          </div>

          <CheckCircleIcon className=" w-4 h-4 mr-2 text-gray-400" />
        </div>
        <hgroup className="my-4">
          <h2 className="text-md font-medium">Payment Summary</h2>

          <p className="text-sm my-2 text-gray-500">
            Other: <span className="text-black">$200</span>
          </p>
          <p className="text-sm text-gray-500">
            Total: <span className="text-black">$400</span>
          </p>
        </hgroup>
      </section>
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="border w-full px-4 py-2 bg-black text-white mt-2"
      >
        Complete Purchase
      </button>
    </div>
  );
}
