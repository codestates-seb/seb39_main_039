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


export const useInputAutoHeight = () => {
  const [checkItemContent, setCheckItemContent] = useState('');
  const [lineBreakIndexDict, setLineBreakIndexDict] = useState({});
  const [lineHeight, setLineHeight] = useState(0);

  const checkItemChangeHandler = useCallback(event => {
      setCheckItemContent(event.target.value);
      
      // console.log('lineBreakIndexDict' , lineBreakIndexDict );
      if (event.target.scrollHeight !== event.target.clientHeight) {
          setLineHeight(prev => prev+1);
          setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length-1]: 1});	
      }
      else {
          if (lineBreakIndexDict[event.target.value.length]) {
              setLineHeight(prev => prev-1);	
              setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length]: 0});	
          }
      }
  }, [lineBreakIndexDict]);

  const checkItemEnterHandler = useCallback(event => {
      if (event.key === 'Enter') {
          setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length]: 1}); 
      }
  }, [lineBreakIndexDict]);

  return [checkItemContent , lineHeight, checkItemChangeHandler, checkItemEnterHandler];
}
