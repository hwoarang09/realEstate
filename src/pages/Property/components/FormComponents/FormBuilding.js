import React, { useState } from "react";
import {
  notNullValue,
  renderCategoryButtons,
  handleChange,
  parseFormInt,
} from "../../../../utils/formUtils";
import { Input } from "../../../../@/components/ui/input";
import { formGenerator } from "../../../../utils/formGenerator";
import StyleForm from "../../../../commonComponents/FormStyle";
import { ToggleButton } from "../../../../commonComponents/ToggleButton";

const FormBuilding = ({
  property,
  setProperty,
  getDefaultBlueprint,
  getHideBlueprint,
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!property) return;

  const buildingSizeComp = (
    <StyleForm formRow>
      <StyleForm label className="w-1/3">
        건물 규모
      </StyleForm>
      <StyleForm className="">
        <StyleForm formRow className=" mb-0">
          <span className="mr-2">지상</span>
          <Input
            type="number"
            name="max_floor"
            value={notNullValue(property.max_floor)}
            onChange={(e) =>
              handleChange(
                ["max_floor"],
                parseFormInt(e.target.value),
                setProperty
              )
            }
            className="w-20 mr-2"
          />
          층
        </StyleForm>
        <StyleForm formRow className=" mb-0">
          <span className="mr-2">지하</span>
          <Input
            type="number"
            name="min_floor"
            value={notNullValue(property.min_floor)}
            onChange={(e) =>
              handleChange(
                ["min_floor"],
                parseFormInt(e.target.value),
                setProperty
              )
            }
            className="w-20 mr-2"
          />
          층
        </StyleForm>
      </StyleForm>
    </StyleForm>
  );

  const defaultBluePrint = getDefaultBlueprint();
  const hideBluePrint = getHideBlueprint({
    customJSX: { buildingSizeComp },
  });

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>건물정보</StyleForm>
        {defaultBluePrint.map((bluePrint, i) => (
          <React.Fragment key={i}>
            {formGenerator({ property, setProperty, ...bluePrint })}
          </React.Fragment>
        ))}
        {showMoreInfo && (
          <>
            {hideBluePrint.map((bluePrint, i) => (
              <React.Fragment key={i}>
                {formGenerator({ property, setProperty, ...bluePrint })}
              </React.Fragment>
            ))}
          </>
        )}
      </StyleForm>
      <StyleForm toggleButtonWrapper>
        <ToggleButton
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
        />
      </StyleForm>
    </StyleForm>
  );
};

export default FormBuilding;
