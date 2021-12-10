import React, { useState } from "react";
import { RegisterFive } from "../RegisterSteps/RegisterFive/RegisterFive";
import { RegisterFour } from "../RegisterSteps/RegisterFour/RegisterFour";
import { RegisterOne } from "../RegisterSteps/RegisterOne/RegisterOne";
import { RegisterSeven } from "../RegisterSteps/RegisterSeven/RegisterSeven";
import { RegisterSix } from "../RegisterSteps/RegisterSix/RegisterSix";
import { RegisterThree } from "../RegisterSteps/RegisterThree/RegisterThree";
import { RegisterTwo } from "../RegisterSteps/RegisterTwo/RegisterTwo";
import { SelectImage } from "../RegisterSteps/SelectImage/SelectImage";
// import { Header } from "../../components/header/Header";

export const Register = () => {
  const Steps = {
    1: RegisterOne,
    2: RegisterFour,
    3: RegisterTwo,
    4: RegisterThree,
    5: RegisterFive,
    6: RegisterSix,
    7: RegisterSeven,
    8: SelectImage,
  };
  const [step, setStep] = useState(1);
  const Step = Steps[step];
  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <>
      <Step onNext={onNext} />
    </>
  );
};
