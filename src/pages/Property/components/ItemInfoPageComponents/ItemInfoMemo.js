// import { getValue } from "../../../../utils/formUtils";
import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import _ from "lodash";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import SubModal from "../../../../commonComponents/SubModal";

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

const ItemInfoMemo = ({ property, setProperty }) => {
  const [commentInput, setCommentInput] = useState("");
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMemoIndex, setCurrentMemoIndex] = useState(null);
  const [currentMemoValue, setCurrentMemoValue] = useState("");
  if (!property) {
    return;
  }
  console.log("property.comment.data", property.comment.data);

  const openModal = (index, value) => {
    console.log("in openModal", index, value);
    setCurrentMemoIndex(index);
    setCurrentMemoValue(value);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveMemo = (newValue) => {
    setProperty((prevProperty) => {
      const newProperty = _.cloneDeep(prevProperty);
      newProperty.comment.data[currentMemoIndex].value = newValue;
      newProperty.comment.data[currentMemoIndex].updated_at =
        new Date().toISOString();
      return newProperty;
    });
    closeModal();
  };
  const copyValue = (value) => {
    navigator.clipboard.writeText(value);
    alert("복사되었습니다.");
  };

  const deleteMemo = (index) => {
    setProperty((prevProperty) => {
      const newProperty = _.cloneDeep(prevProperty);
      newProperty.comment.data = newProperty.comment.data.filter(
        (_, i) => i !== index
      );
      newProperty.comment.count -= 1;
      return newProperty;
    });
  };
  if (!property) {
    return;
  }
  const addComment = () => {
    const newComment = {
      id: Date.now(),
      value: commentInput,
      updated_at: new Date().toISOString(),
      username: "admin 윤성원!",
      is_editable: true,
    };

    setProperty((prevProperty) => {
      const newProperty = _.cloneDeep(prevProperty);
      newProperty.comment.data.push(newComment);
      newProperty.comment.count += 1;
      return newProperty;
    });

    setCommentInput("");
  };

  console.log("CommentList rendered");

  const memos = property.comment.data.map((memo, index) => {
    return (
      <div key={index} className="comment mb-4 p-2">
        <div className="flex justify-between items-center mb-2">
          <div>{memo.username}</div>
          <div>{getTimeDifference(memo.updated_at)}</div>
          <div className="flex space-x-2">
            <MdOutlineContentCopy
              type="button"
              onClick={() => copyValue(memo.value)}
            >
              복사
            </MdOutlineContentCopy>

            <MdEdit
              type="button"
              onClick={() => {
                openModal(index, memo.value);
                console.log(index, memo.value);
              }}
            >
              수정
            </MdEdit>
            <FaTrashAlt type="button" onClick={() => deleteMemo(index)}>
              삭제
            </FaTrashAlt>
          </div>
        </div>
        <div>{memo.value}</div>
      </div>
    );
  });

  return (
    <div className="my-6">
      <div className="mb-2 ">
        <div className="text-blue-600 text-base font-bold mb-2">
          매물 특징 (메모)
        </div>
        <div className="mb-2 text-sm">
          <div className="flex mb-2">
            <div className="w-80">{memos}</div>
          </div>
          {showMoreInfo && (
            <>
              <div className="relative w-full">
                <textarea
                  type="text"
                  name="comment"
                  value={commentInput}
                  placeholder="메모를 입력하세요"
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="border rounded p-2 focus:border-blue-500 focus:border-2 focus:outline-none w-full min-h-28"
                  style={{ paddingRight: "3rem" }} // 버튼 위치를 위한 패딩
                />
                <button
                  type="button"
                  onClick={() => {
                    addComment(commentInput);
                    setCommentInput(""); // 입력 필드 초기화
                  }}
                  className="absolute bottom-2 right-2 bg-blue-500 text-white py-1 px-3 rounded"
                >
                  전송
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <Button
          primary
          rounded
          outline
          className="mb-4 flex justify-between py-0.5 px-1"
          type="button" // 버튼의 기본 타입을 button으로 설정하여 submit 방지
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          {showMoreInfo ? (
            <>
              <span className="text-xs mr-2">접기</span>
              <span>
                <FaChevronUp />
              </span>
            </>
          ) : (
            <>
              <span className="text-xs mr-2">펼치기</span>
              <span>
                <FaChevronDown />
              </span>
            </>
          )}
        </Button>
      </div>
      <SubModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveMemo}
        initialValue={currentMemoValue}
      />
    </div>
  );
};

export default ItemInfoMemo;
