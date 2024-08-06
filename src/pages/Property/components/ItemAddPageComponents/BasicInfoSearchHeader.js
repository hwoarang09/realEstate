import React, { useState } from "react";
import "../../../../styles/index.css";
import StyleForm from "../../../../commonComponents/FormStyle";
import Button from "../../../../commonComponents/Button";
import { Input } from "../../../../@/components/ui/input";

export const BasicInfoSearchHeader = ({
  inputValue,
  handleChange,
  handleSearch,
}) => {
  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <div className=" font-bold flex items-center justify-center w-full">
          매물 주소를 입력하여 데이터 조회하기
        </div>
        <StyleForm className="flex items-center justify-center">
          <div className="w-[300px] mr-4 my-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => handleChange(e)}
                className="border"
              />

              <div className=" mr-4 my-4">
                <Button primary type="button" onClick={handleSearch}>
                  검색
                </Button>
              </div>
            </div>
          </div>
        </StyleForm>
      </StyleForm>
    </StyleForm>
  );
};
