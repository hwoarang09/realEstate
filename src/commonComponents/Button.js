import className from "classnames";
import { twMerge } from "tailwind-merge";
function Button({
  children,
  primary,
  primary_add,
  secondary,
  success,
  warning,
  danger,
  option_select,
  option_noselect,
  outline,
  rounded,
  ...rest
}) {
  const classes = twMerge(
    className(
      "px-3 py-1.5 border flex items-center",
      {
        "border-blue-500 bg-blue-500 text-white": primary,
        "border-blue-500 bg-blue-500 text-black font-bold": primary_add,
        "border-gray-900 bg-gray-900 text-white": secondary,
        "border-green-500 bg-green-500 text-white": success,
        "border-yellow-400 bg-yellow-400 text-white": warning,
        "border-red-500 bg-red-500 text-white": danger,

        "border-purple-200 bg-purple-200 text-black font-bold  text-xs py-1 px-4 mx-0.5 w-20 justify-between":
          option_select,
        "border-gray-200 bg-gray-200 text-black text-xs py-1": option_noselect,

        "rounded-full": rounded,
        "bg-white": outline,
        "text-blue-500": outline && (primary || primary_add),
        "text-gray-900": outline && secondary,
        "text-green-500": outline && success,
        "text-yellow-400": outline && warning,
        "text-red-500": outline && danger,
      },
      rest.className
    )
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}


//추후에 typescript로 대체
Button.propTypes = {
  checkVariationValue: ({
    primary,
    primary_add,
    secondary,
    success,
    warning,
    danger,
  }) => {
    const count =
      Number(!!primary) +
      Number(!!primary_add) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        "Only one of primary, primary_add, secondary, success, warning, danger can be true"
      );
    }
  },
};

export default Button;
