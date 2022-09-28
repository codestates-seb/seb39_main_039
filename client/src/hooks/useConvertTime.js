import React from "react";

const useConvertTime1 = (time) => {
  if (time) {
    let year = time[0].slice(0, 4);
    let month = time[0].slice(5, 7);
    let day = time[0].slice(8, 10);
    let hour = time[1].slice(0, 2);
    let minute = time[1].slice(3, 5);

    return [year, month, day, hour, minute];
  }
};

export default useConvertTime1;
