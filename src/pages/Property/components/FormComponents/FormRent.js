import React, { useState } from "react";
import StyleForm from "../../../../commonComponents/FormStyle";
import { formGenerator } from "../../../../utils/formGenerator";
import { ToggleButton } from "../../../../commonComponents/ToggleButton";

const FormRent = ({
  property,
  setProperty,
  getDefaultBlueprint,
  getHideBlueprint,
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!property) return;

  const defaultBluePrint = getDefaultBlueprint();
  const hideBluePrint = getHideBlueprint();

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>임대정보</StyleForm>
        {defaultBluePrint.map((bluePrint, i) => (
          <React.Fragment key={`rt1_${i}`}>
            {formGenerator({ property, setProperty, ...bluePrint })}
          </React.Fragment>
        ))}

        {showMoreInfo && (
          <>
            {hideBluePrint.map((bluePrint, i) => (
              <React.Fragment key={`rt2_${i}`}>
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

export default FormRent;
