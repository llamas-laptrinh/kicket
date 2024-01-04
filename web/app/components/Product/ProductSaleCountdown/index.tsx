import React from 'react';

type ProductSaleProps = {
  countDownTimer: () => string;
};

export default function ProductSaleCountdown({
  countDownTimer,
}: ProductSaleProps) {
  const [time, setTime] = React.useState('20d 2h 5m');
  React.useEffect(() => {
    const key = setInterval(() => {
      const timeString = countDownTimer();
      setTime(timeString);
    }, 1000);
    return () => {
      clearInterval(key);
    };
  }, [countDownTimer]);
  return <p className="text-sm font-semibold my-2">Sale ends in {time}</p>;
}
