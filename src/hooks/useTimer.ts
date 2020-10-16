import { useState, useEffect } from "react";

export default (typed: string) => {
  const [startTime, setStartTime] = useState<Date | undefined>();

  useEffect(() => {
    if (typed !== "" && startTime === undefined) {
      console.log("Setting start time");
      setStartTime(new Date());
    }
  }, [typed, startTime]);

  const clearStartTime = () => setStartTime(undefined);

  return { startTime, clearStartTime };
};
