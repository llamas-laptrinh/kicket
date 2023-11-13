import ReviewStar from "@/app/components/reviewStar";
import {
  ChevronRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";

import Image from "next/image";
import React from "react";

import Link from "next/link";
import PageLayout from "@/app/components/layouts/pageLayout";

const dummyData = [
  {
    id: "0",
    icon: CalendarDaysIcon,
    nextHref: "",
    options: [21, 22, 23, 24, 25],
    isShowMore: true,
  },
  {
    id: "1",
    icon: ClockIcon,
    nextHref: "",
    options: ["12:00", "13:00", "16:00"],
    isShowMore: true,
  },
  {
    id: "2",
    icon: MapPinIcon,
    nextHref: "",
    options: ["HCMC", "HN", "DN", "HUE", "VP"],
    isShowMore: true,
  },
  {
    id: "3",
    icon: CurrencyDollarIcon,
    nextHref: "",
    options: [100],
    isShowMore: false,
  },
];

export default function Detail() {
  return (
    <PageLayout title="Ticket Detail" buttonTitle="Pay">
      <div className="ticket-content flex">
        <div className="left-content w-1/2">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKiBT7-yyrdhEQtSlG-36yzVkzzTXxq6oIUs3UfofsPIQxqfQFhq-0abODgvRSzLqHVVw&usqp=CAU"
            width={100}
            height={300}
            alt="poster"
          />
        </div>

        <div className="right-content w-1/2">
          <h3 className="font-bold text-2xl uppercase">Klaytn</h3>

          <p className="uppercase my-2 text-xs font-semibold text-gray-500">
            Host: <span className="text-black">150min</span>
          </p>
          <p className="uppercase my-2 text-xs font-semibold text-gray-500">
            Stars: <span className="text-black">150min</span>
          </p>
          <p className="uppercase my-2 text-xs font-semibold text-gray-500">
            Time: <span className="text-black">150min</span>
          </p>
          <div className="ratings">
            <ReviewStar reviews={{ average: 4.5, totalCount: 150, href: "" }} />
          </div>
          <div className="like-comment"></div>
        </div>
      </div>
      <div className="select-content my-8">
        {dummyData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex my-4 items-center">
              <div className="icon-container mr-2 h-5 w-5">
                <Icon className="text-gray-900" aria-hidden="true" />
              </div>
              <div className="options-container px-2 w-3/4 flex place-content-between">
                {item.options.map((item) => (
                  <p className="cursor-pointer hover:opacity-50" key={item}>
                    {item}
                  </p>
                ))}
              </div>

              {item.isShowMore && (
                <Link href={item.nextHref} className="next-icon h-5 w-5">
                  <ChevronRightIcon aria-hidden="true" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
