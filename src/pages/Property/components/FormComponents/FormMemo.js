import React, { useState } from "react";
import _ from "lodash";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import SubModal from "../../../../commonComponents/SubModal";
import MemoEditModal from "../ItemInfoPageComponents/ItemInfoMemoEditModal";
import {
  useRemoveCommentMutation,
  useUpdateCommentMutation,
  useAddCommentMutation,
  useFetchCommentsQuery,
} from "../../../../store";
import { Textarea } from "../../../../@/components/ui/textarea";
import { notNullValue, handleChange } from "../../../../utils/formUtils";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { MemoItem } from "./FormMemoItem";
import StyleForm from "../../../../commonComponents/FormStyle";
import { ToggleButton } from "../../../../commonComponents/ToggleButton";

//메모 컴포넌트
//메모랑, 매물 설명이랑 같은 컴포넌트로 묶여잇음.
const FormMemo = ({ property, setProperty }) => {
  //State
  const [commentInput, setCommentInput] = useState("");
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMemoIndex, setCurrentMemoIndex] = useState(null);
  const [currentMemoValue, setCurrentMemoValue] = useState("");
  const [removeComment] = useRemoveCommentMutation();
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const { data, error, isLoading, refetch } = useFetchCommentsQuery(
    property
      ? { resource_id: property.id, resource_type: "property" }
      : skipToken
  );

  //에러처리
  if (!property) {
    return;
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  //메모 수정 모달창 열기
  const openModal = (index, value) => {
    setCurrentMemoIndex(index);
    setCurrentMemoValue(value);
    setIsModalOpen(true);
  };

  //메모 수정 모달창 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //메모 복사
  const copyValue = (value) => {
    navigator.clipboard.writeText(value);
    alert("복사되었습니다.");
  };

  //메모 저장
  const saveMemo = (index, value) => {
    updateComment({
      resource_id: property.id,
      comment_id: data.contents.data[index].id,
      value: value,
    }).then(() => {
      refetch();
    });
    closeModal();
  };

  //메모 삭제
  const deleteMemo = (index) => {
    removeComment({
      resource_id: property.id,
      comment_id: data.contents.data[index].id,
    }).then(() => {
      refetch();
    });
  };

  //메모 추가
  const addCommentHandle = () => {
    addComment({
      resource_id: property.id,
      resource_type: "property",
      value: commentInput,
    }).then(() => {
      refetch();
    });

    setCommentInput("");
  };

  //메모 리스트
  const memos = data.contents.data.map((memo, index) => {
    return (
      <MemoItem
        key={index}
        memo={memo}
        index={index}
        onCopy={copyValue}
        onEdit={openModal}
        onDelete={deleteMemo}
      />
    );
  });

  //매물 설명 길이에 따른 높이 조절
  //메모랑, 매물 설명이랑 같은 컴포넌트로 묶여잇음.
  const descHeight = property.description.length > 100 ? "h-48" : "h-16";

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>매물 특징 (메모)</StyleForm>
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
        {/* <div className="mb-2 text-sm"> */}
        <StyleForm tabWrapper>
          {showMoreInfo && property.id && (
            <>
              <div className="border border-gray-300 rounded-lg shadow-lg p-4">
                <div className="flex">
                  <div
                    className={`overflow-y-auto w-full max-h-72 overflow-y-auto px-8 ${
                      data.contents.data.length > 0 ? `border-b pt-4 ` : ``
                    }`}
                  >
                    {memos}
                  </div>
                </div>
                <div
                  className={`relative w-full px-8 ${
                    data.contents.data.length > 0 ? `pt-4 ` : ``
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
          {/* </div> */}
        </StyleForm>
      </StyleForm>

      <StyleForm toggleButtonWrapper>
        <ToggleButton
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
        />
      </StyleForm>

      {/* isOpen, onClose는 무조건 포함. onSave, index, initialValue등은 여기서만 사용*/}
      <SubModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveMemo}
        index={currentMemoIndex}
        initialValue={currentMemoValue}
      >
        <MemoEditModal />
      </SubModal>
    </StyleForm>
  );
};

export default FormMemo;
