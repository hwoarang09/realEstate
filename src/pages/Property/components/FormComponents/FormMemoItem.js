import { MdOutlineContentCopy } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { FaTrashAlt } from "react-icons/fa";

//현시각 - 작성시간 = 시간차 구하는 함수
const getTimeDifference = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const differenceInMilliseconds = now - date;
  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60)
  );
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  } else {
    return `${differenceInDays}일 전`;
  }
};

export const MemoItem = ({ memo, index, onCopy, onEdit, onDelete }) => (
  <div className="comment mb-4 p-2 border">
    <div className="flex justify-between items-center mb-4">
      <div className="mr-3 font-bold">{memo.username}</div>
      <div className="text-gray-500">{getTimeDifference(memo.updated_at)}</div>
      <div className="flex-grow"></div>
      <div className="flex justify-end space-x-2 text-xl ">
        <MdOutlineContentCopy
          type="button"
          onClick={() => onCopy(memo.value)}
          className="cursor-pointer"
        />
        <MdEdit
          type="button"
          onClick={() => onEdit(index, memo.value)}
          className="cursor-pointer"
        />
        <FaTrashAlt
          type="button"
          onClick={() => onDelete(index)}
          className="cursor-pointer"
        />
      </div>
    </div>
    <div>{memo.value}</div>
  </div>
);
