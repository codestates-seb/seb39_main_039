import { useState, useCallback } from 'react'

export const useInput = (initalValue) => {
  const [data, setData] = useState(initalValue);

  const handler = useCallback(
    e => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value
      });
    },
    [data]
  );
  return [data, handler];
}
