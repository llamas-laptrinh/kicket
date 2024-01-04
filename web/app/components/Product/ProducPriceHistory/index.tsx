import React from 'react';
import Chart from 'react-apexcharts';

const data = {
  options: {
    chart: {
      id: 'apexchart-example',
    },
    xaxis: {
      // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      categories: [],
    },
  },
  series: [
    {
      name: 'series-1',
      data: [],
      // data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ],
};

export default function ProductPriceHistory() {
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
