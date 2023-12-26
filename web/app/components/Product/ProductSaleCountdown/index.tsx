import { countDownTimer } from '@app/utils/count-down-timer';
import React from 'react';

type ProductSaleCountdownProps = () => {};
const x = countDownTimer(new Date('Jan 5, 2024 15:37:25'));

export default function ProductSaleCountdown() {
  const [time, setTime] = React.useState('20d 2h 5m');
  React.useEffect(() => {
    const key = setInterval(() => {
      const timeString = x();
      setTime(timeString);
    }, 1000);
    return () => {
      clearInterval(key);
    };
  }, []);
  return <p className="text-sm font-semibold my-2">Sale ends in {time}</p>;
}
