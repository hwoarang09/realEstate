import StyleForm from "../../../../commonComponents/FormStyle";

const FormTag = ({ property, setProperty }) => {
  if (!property) {
    return;
  }
  return (
    <StyleForm mainWrapper>
      <StyleForm menuTitle>태그</StyleForm>
    </StyleForm>
  );
};

export default FormTag;
