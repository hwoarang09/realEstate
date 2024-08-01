import className from "classnames";
import { twMerge } from "tailwind-merge";
function StyleForm({
  children,
  mainWrapper,
  tabWrapper,
  menuTitle,
  flatButtons,
  toggleButtonWrapper,
  formRow,
  label,
  ...rest
}) {
  const classes = twMerge(
    className(
      "",
      {
        "mt-6": mainWrapper,
        "mb-4": tabWrapper,
        "text-blue-600 text-base font-bold mb-2": menuTitle,
        "flex flex-wrap items-center ": flatButtons,
        "flex justify-center mt-3": toggleButtonWrapper,
        "text-sm flex items-center font-bold w-24": label,
        "flex mb-4 min-h-[40px] items-center": formRow,
        // "text-blue-600 text-base font-bold mb-2":menuTitle,
        // "text-blue-500": outline && (primary || primary_add),
        // "text-gray-900": outline && secondary,
      },
      rest.className
    )
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default StyleForm;
