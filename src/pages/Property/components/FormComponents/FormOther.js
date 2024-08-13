import React, { useState } from "react";
import { ToggleButton } from "../../../../commonComponents/ToggleButton";
import StyleForm from "../../../../commonComponents/FormStyle";

import { formGenerator } from "../../../../utils/formGenerator";

const FormOther = ({
  property,
  setProperty,
  getDefaultBlueprint,
  getHideBlueprint,
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!property) {
    return;
  }

  const defaultBluePrint = getDefaultBlueprint();
  const hideBluePrint = getHideBlueprint();

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>기타 설정</StyleForm>
        {defaultBluePrint.map((bluePrint, i) => (
          <React.Fragment key={`${i}`}>
            {formGenerator({
              property,
              setProperty,
              ...bluePrint,
            })}
          </React.Fragment>
        ))}

        {showMoreInfo && (
          <>
            {hideBluePrint.map((bluePrint, i) => (
              <React.Fragment key={`${i}`}>
                {formGenerator({
                  property,
                  setProperty,
                  ...bluePrint,
                })}
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

export default FormOther;
