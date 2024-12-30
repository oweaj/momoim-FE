const inputDataFormat = (value: string) => {
  const formetValue = value.replace(/[^0-9]/g, "");
  const formetLengthCheck = formetValue.length > 2 ? formetValue.slice(0, 2) : formetValue;

  return parseInt(formetLengthCheck, 10);
};

export default inputDataFormat;
