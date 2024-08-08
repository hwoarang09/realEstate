function formatDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const period = hours >= 12 ? "오후" : "오전";
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  const formattedDate = `${year}년 ${month}월 ${day}일 ${period} ${hours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedDate;
}
const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

const isValidDate = (date) => {
  if (/^[0-9]{8}$/.test(date)) {
    const year = parseInt(date.substring(0, 4), 10);
    const month = parseInt(date.substring(4, 6), 10) - 1; // JavaScript의 month는 0부터 시작합니다.
    const day = parseInt(date.substring(6, 8), 10);

    const dateObj = new Date(year, month, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month &&
      dateObj.getDate() === day
    );
  }
  return false;
};
export { formatDate, getCurrentTimestamp, isValidDate };
