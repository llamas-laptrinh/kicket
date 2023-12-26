export const countDownTimer = (date: Date) => {
  const countDownDate = date.getTime();

  // Update the count down every 1 second
  return function () {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // If the count down is over, write some text
    if (distance < 0) {
      return 'EXPIRED';
    }

    // Output the result in an element with id="demo"
    return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
  };
};

// const x = setInterval(() => {}, 1000);
