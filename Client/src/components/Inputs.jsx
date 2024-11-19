/* eslint-disable react/prop-types */

export const Inputs = ({
  inputName,
  inputType,
  inputId,
  inputValue,
  onChangeHandler,
  inputRequired,
  inputLabel
}) => {
  return (
    <>
      <label htmlFor={inputName} className="form-control  w-full max-w-xs">
        <div className="label">
          <span className="label-text ">{inputLabel}</span>
        </div>
        <input
          type={inputType}
          id={inputId}
          name={inputName}
          value={inputValue}
          onChange={onChangeHandler}
          required={inputRequired}
          placeholder=""
          className="input input-bordered w-full max-w-xs"
        />
      </label>

      {/* <div className="form-group">
        <label htmlFor={inputName}>{inputName}</label>
        <input
          type={inputType}
          id={inputId}
          name={inputName}
          value={inputValue}
          onChange={onChangeHandler}
          required={inputRequired}
        />
      </div> */}
    </>
  );
};
