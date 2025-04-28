import { useState } from "react";

const Otp = ({ size = 6 }) => {
  const [inputValues, setInputValues] = useState(() => {
    return new Array(size).fill("");
  });
  const handelIput = (e, index) => {
    const inp = Number(e.key);
    // console.log(e.key);
    if (e.key === "ArrowLeft") {
      if (e.target.selectionStart == 0 || e.target.value == "") {
        // console.log("Hi2");
        if (!e.target.previousElementSibling) {
          return;
        }
        e.target.previousElementSibling.focus();
      }
    }
    if (e.key === "ArrowRight") {
      if (e.target.selectionStart == 1 || e.target.value == "") {
        // console.log("Hi2");
        if (!e.target.nextElementSibling) {
          return;
        }
        e.target.nextElementSibling.focus();
      }
    }
    if (e.key.toLowerCase() === "backspace") {
      // console.log(index);
      clearInput(e, index);
      return;
    }
    if (isNaN(inp)) return;
    if (inputValues[index].length === 0) {
      setInputValues((prev) => {
        const newValue = [...prev];
        // console.log(newValue);
        newValue[index] = inp.toString();
        return newValue;
      });
      focusInput(e.target);
    } else {
      const cursorpos = e.target.selectionStart;
      // console.log(cursorpos);
      if (cursorpos === 0) {
        setInputValues((prev) => {
          const newValues = [...prev];
          if (index < size - 1) {
            newValues[index + 1] = prev[index];
          }
          newValues[index] = e.key.toString();
          return newValues;
        });
        focusNextInput(e.target);
      } else {
        setInputValues((prev) => {
          const newValue = [...prev];
          if (index < size - 1) {
            newValue[index + 1] = e.key.toString();
          }
          return newValue;
        });
        focusNextInput(e.target);
      }
    }
  };

  const clearInput = (e, index) => {
    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[index] = "";
      return newValues;
    });
    if (!e.target.previousElementSibling) {
      return;
    }
    focusInputPrev(e.target);
  };

  const focusInputPrev = (currentInp) => {
    currentInp.previousElementSibling.focus();
  };

  const focusNextInput = (currElement) => {
    if (!currElement?.nextElementSibling?.nextElementSibling) {
      // console.log("HI");
      focusInput(currElement);
      return;
    }
    if (currElement?.nextElementSibling?.nextElementSibling) {
      currElement.nextElementSibling.nextElementSibling.focus();
    } else {
      focusNextInput(currElement);
    }
  };
  const focusInput = (currentInp) => {
    // console.log(currentInp.nextElementSibling);
    if (!currentInp.nextElementSibling) {
      return;
    }
    currentInp.nextElementSibling.focus();
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
              maxLength={1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Otp;
