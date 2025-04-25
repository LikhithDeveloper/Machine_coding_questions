import { useState } from "react";

const Otp = ({ size = 4 }) => {
  const [inputValues, setInputValues] = useState(() => {
    return new Array(size).fill("");
  });
  const handelIput = (e, index) => {
    const inp = Number(e.key);
    if (isNaN(inp)) return;
    if (inputValues[index].length === 0) {
      setInputValues((prev) => {
        const newValue = [...prev];
        console.log(newValue);
        newValue[index] = inp.toString();
        return newValue;
      });
    }
    focusInput(e.target);
  };

  const focusInput = (currentInp) => {
    currentInp.previousElementSibling.focus();
  };

  return (
    <div className="otp-main">
      <div className="otp-container">
        {inputValues.map((inputValue, index) => {
          return (
            <input
              type="text"
              value={inputValue}
              key={index}
              index={index.toString()}
              onKeyDown={() => handelIput(event, index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Otp;
