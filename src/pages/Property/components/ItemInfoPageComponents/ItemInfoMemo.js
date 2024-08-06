import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import _ from "lodash";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import SubModal from "../../../../commonComponents/SubModal";
import MemoEditModal from "./ItemInfoMemoEditModal";
import {
  useRemoveCommentMutation,
  useUpdateCommentMutation,
  useAddCommentMutation,
} from "../../../../store";
import { Textarea } from "../../../../@/components/ui/textarea";
import { notNullValue, handleChange } from "../../../../utils/formUtils";
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
  const [removeComment] = useRemoveCommentMutation();
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  if (!property) {
    return;
  }

  const openModal = (index, value) => {
    setCurrentMemoIndex(index);
    setCurrentMemoValue(value);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveMemo = (index, value) => {
    //화면만
    setProperty((prevProperty) => {
      const newProperty = _.cloneDeep(prevProperty);
      newProperty.comment.data[index].value = value;
      newProperty.comment.data[index].updated_at = new Date().toISOString();
      return newProperty;
    });
    //실제 업데이트
    updateComment({
      resource_id: property.id,
      comment_id: property.comment.data[index].id,
      value: value,
    });
    closeModal();
  };
  const copyValue = (value) => {
    navigator.clipboard.writeText(value);
    alert("복사되었습니다.");
  };

  const deleteMemo = (index) => {
    //화면에만 반영...서버에는 반영 안됨

    setProperty((prevProperty) => {
      const newProperty = _.cloneDeep(prevProperty);

      newProperty.comment.data = newProperty.comment.data.filter(
        (_, i) => i !== index
      );
      newProperty.comment.count -= 1;
      return newProperty;
    });

    // 서버에 반영
    removeComment({
      resource_id: property.id,
      comment_id: property.comment.data[index].id,
    });
  };

  const addCommentHandle = () => {
    const newComment = {
      id: Date.now(),
      value: commentInput,
      updated_at: new Date().toISOString(),
      username: "admin 윤성원!",
      is_editable: true,
    };

    //화면에 실시간 반영만함... 서버에는 반영 안됨
    setProperty((prevProperty) => {
      const newProperty = _.cloneDeep(prevProperty);
      newProperty.comment.data.push(newComment);
      newProperty.comment.count += 1;
      return newProperty;
    });

    addComment({
      resource_id: property.id,
      resource_type: "property",
      value: commentInput,
    });

    setCommentInput("");
  };

  const memos = property.comment.data.map((memo, index) => {
    return (
      <div key={index} className="comment mb-4 p-2 border">
        <div className="flex justify-between items-center mb-4">
          <div className="mr-3 font-bold">{memo.username}</div>
          <div className="text-gray-500">
            {getTimeDifference(memo.updated_at)}
          </div>
          <div className="flex-grow"></div>
          <div className="flex justify-end space-x-2 text-xl ">
            <MdOutlineContentCopy
              type="button"
              onClick={() => copyValue(memo.value)}
              className="cursor-pointer"
            ></MdOutlineContentCopy>

            <MdEdit
              type="button"
              onClick={() => {
                openModal(index, memo.value);
                console.log(index, memo.value);
              }}
              className="cursor-pointer"
            ></MdEdit>
            <FaTrashAlt
              type="button"
              onClick={() => deleteMemo(index)}
              className="cursor-pointer"
            ></FaTrashAlt>
          </div>
        </div>
        <div>{memo.value}</div>
      </div>
    );
  });
  const descHeight = property.description.length > 100 ? "h-48" : "h-16";

  // const memoEditChildren =

  return (
    <div className="my-6">
      <div className="mb-2 ">
        <div className="text-blue-600 text-base font-bold mb-2">
          매물 특징 (메모)
        </div>
        <div className="mb-4">
          <Textarea
            type="text"
            name="description"
            value={notNullValue(property.description)}
            onChange={(e) =>
              handleChange(["description"], e.target.value, setProperty)
            }
            className={`overflow-y-hidden focus:overflow-y-auto ${descHeight}`}
          />
        </div>
        <div className="mb-2 text-sm">
          {showMoreInfo && (
            <>
              <div className="border border-gray-300 rounded-lg shadow-lg p-4">
                <div className="flex">
                  <div
                    className={`overflow-y-auto w-full max-h-72 overflow-y-auto px-8 pt-4 ${
                      property.comment.data.length > 0 ? `border-b ` : ``
                    }`}
                  >
                    {memos}
                  </div>
                </div>
                <div
                  className={`relative w-full px-8 ${
                    property.comment.data.length > 0 ? `pt-4 ` : ``
                  }`}
                >
                  <Textarea
                    name="comment"
                    value={commentInput}
                    placeholder="메모를 입력하세요"
                    onChange={(e) => setCommentInput(e.target.value)}
                    // className="border rounded p-2 focus:border-blue-500 focus:border-2 focus:outline-none w-full min-h-28"
                    style={{ paddingRight: "3rem" }} // 버튼 위치를 위한 패딩
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addCommentHandle(commentInput);
                      setCommentInput(""); // 입력 필드 초기화
                    }}
                    className="absolute bottom-4 right-12 bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    전송
                  </button>
                </div>
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
        index={currentMemoIndex}
        initialValue={currentMemoValue}
      >
        <MemoEditModal />
      </SubModal>
    </div>
  );
};

export default ItemInfoMemo;
