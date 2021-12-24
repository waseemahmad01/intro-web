import React, { useState, useEffect } from "react";
import { RegisterFive } from "../RegisterSteps/RegisterFive/RegisterFive";
import { RegisterFour } from "../RegisterSteps/RegisterFour/RegisterFour";
import { RegisterOne } from "../RegisterSteps/RegisterOne/RegisterOne";
import { RegisterSeven } from "../RegisterSteps/RegisterSeven/RegisterSeven";
import { RegisterSix } from "../RegisterSteps/RegisterSix/RegisterSix";
import { RegisterThree } from "../RegisterSteps/RegisterThree/RegisterThree";
import { RegisterTwo } from "../RegisterSteps/RegisterTwo/RegisterTwo";
import { SelectImage } from "../RegisterSteps/SelectImage/SelectImage";
import { useSelector } from "react-redux";
import { getUser } from "../../http";
// import { Header } from "../../components/header/Header";

export const Register = () => {
  const user = useSelector((state) => state.auth.user.data);
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
  useEffect(() => {
    let userData;
    (async () => {
      const { data } = await getUser();
      userData = data.data;
    })();
    const step = userData.step;
    switch (step) {
      case "/dob" || "/username":
        setStep(1);
        break;
      case "/gender-selection" || "/choose-date-characters":
        setStep(2);
        break;
      case "/height" || "/body-type":
        setStep(3);
        break;
      case "/ethnicity-page" || "/get-user-home-town":
        setStep(4);
        break;
      case "/get-user-education" || "/get-user-profession":
        setStep(5);
        break;
      case "/get-user-religion" || "/get-user-children":
        setStep(6);
        break;
      case "/get-user-vices":
        setStep(7);
        break;
      case "/get-user-photos":
        setStep(8);
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Step onNext={onNext} />
    </>
  );
};
