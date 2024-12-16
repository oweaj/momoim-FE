export const leftTimeGenerator = (timeStamp: string) => {
  const targetDate = Number(new Date(timeStamp));
  const currentDate = Number(new Date());
  const timeDifference = targetDate - currentDate;
  if (timeDifference > 0) {
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;
    const days = Math.floor(timeDifference / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay));
    const hours = Math.floor(
      (timeDifference % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) /
        (millisecondsInSecond * secondsInMinute * minutesInHour),
    );
    const minutes = Math.floor(
      (timeDifference % (millisecondsInSecond * secondsInMinute * minutesInHour)) /
        (millisecondsInSecond * secondsInMinute),
    );
    return { days, hours, minutes };
  }
  return { days: 0, hours: 0, minutes: 0 };
};
