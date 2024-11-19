/* eslint-disable react/prop-types */

export const Buttons = ({ btnType, btnName, btnClass, icon: Icon,onClickHandler }) => {
  return (
    <button type={btnType} className={btnClass} onClick={onClickHandler}>
      {Icon && <Icon />} {btnName}
    </button>
  );
};
