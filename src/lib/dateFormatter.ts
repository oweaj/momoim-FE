export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate());
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDateSimple = `${month}월 ${day}일 ${hours}:${minutes}`;
  const formattedDateDetail = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  return { simple: formattedDateSimple, detail: formattedDateDetail };
};
