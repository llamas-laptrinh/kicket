'use client';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

type ProductPriceHistoryProps = {
  data: {
    options: ApexOptions;
    series: ApexOptions['series'];
  };
};
export default function ProductPriceHistory({
  data,
}: ProductPriceHistoryProps) {
  return (
    <div className="my-2">
      <h1 className="text-bold text-xl">Price History</h1>
      <Chart
        options={data.options}
        series={data.series}
        type="line"
        width={500}
        height={320}
      />
    </div>
  );
}
