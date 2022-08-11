import React from "react";
import { format } from "date-fns";
import { useState, useEffect } from 'react';
import { CountdownRoot } from './Countdown.styles';


const getMilisecondsUpToEndDate = (end: number) => {
  const endDate = new Date(end)

  return endDate.getTime() - Date.now();
};

const SECOND = 1000

type CountdownProps = {
  end: number
}

export const Countdown = ({end}: CountdownProps) => {
  const [remainingTime, setRemainingTime] = useState(() => getMilisecondsUpToEndDate(end));

  useEffect(() => {
    if (remainingTime <= 0) return

    const timeoutId = setTimeout(() => {
      setRemainingTime(remainingTime - SECOND)
    }, SECOND)

    return () => clearTimeout(timeoutId)
  }, [remainingTime])

  return <CountdownRoot>{format(remainingTime, 'HH:mm:ss')}</CountdownRoot>;
};
