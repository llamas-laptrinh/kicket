import PageLayout from "@/app/components/layouts/pageLayout";
import React from "react";
import QRCode from "react-qr-code";

const Dots = ({ side }: { side: "left" | "right" }) => {
  return (
    <>
      <div
        className={`dots absolute -${side}-[${
          side === "right" ? "25%" : "10%"
        }] top-[50%] -translate-y-2/4 rounded-full w-12 h-12 bg-white`}
      />
      <span className="-left-1 -right-1 -left-[10%] -right-[25%]"></span>
      <div
        className={`dots absolute -${side}-1 bottom-[6%] rounded-full w-2 h-2 bg-white`}
      />
      <div
        className={`dots absolute -${side}-1 bottom-[16%] rounded-full w-2 h-2 bg-white`}
      />
      <div
        className={`dots absolute -${side}-1 top-[6%] rounded-full w-2 h-2 bg-white`}
      />
      <div
        className={`dots absolute -${side}-1 top-[16%] rounded-full w-2 h-2 bg-white`}
      />
    </>
  );
};

export default function MyTickets() {
  return (
    <PageLayout title="My Tickets" buttonTitle="Take">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((t) => {
        return (
          <div key={t} className="ticket-container my-6 flex w-full h-32 bg-teal-500">
            <div className="left-content w-3/4 relative">
              <Dots side="left" />
            </div>
            <div className="left-content relative w-1/4 border-dashed border-l-2">
              <Dots side="right" />
              <QRCode
                size={18}
                style={{ height: "auto", maxWidth: "100%", width: "28px" }}
                value={"hello"}
                fgColor="transparent"
                viewBox="transparent"
                className="absolute top-2 left-1/2 -translate-x-2/4"
              />
            </div>
          </div>
        );
      })}
    </PageLayout>
  );
}
