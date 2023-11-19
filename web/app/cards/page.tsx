import React from "react";
import PageLayout from "../components/layouts/pageLayout";
import Image from "next/image";
import Link from "next/link";

const getListCards = () => {
  return new Promise((res, rej) => {
    const dummyData = [
      {
        id: "1",
        title: "Membership",
        logo: "/membership.png",
        type: "1",
      },
      {
        id: "2",
        title: "Event Ticket",
        logo: "/ticket.png",
        type: "2",
      },
      { id: "3", title: "Gift", logo: "/gift.png", type: "3" },
      {
        id: "4",
        title: "Score card",
        logo: "/score-card.png",
        type: "4",
      },
    ];
    res(dummyData);
  });
};

export default async function Page() {
  const cards: any = await getListCards();
  return (
    <PageLayout title="Select Cards">
      <div className="flex justify-center">
        <div>
          {cards.map(({ id, title, logo, type }: any) => (
            <a key={id} href={`tickets/details/${type}`}>
              <Image
                className="mb-2 w-full h-auto"
                width={300}
                height={50}
                src={logo}
                alt={title}
              />
            </a>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
