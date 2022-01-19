export const getRemainingTime = () => {
  let time = localStorage.getItem("liveLoopTime") * 1;
  if (time >= 180) {
    return 180;
  } else if (time === 0) {
    return false;
  } else {
    return time;
  }
};
