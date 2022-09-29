import { useEffect, useState } from "react";

export const useScrollTop = () => {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    const handleScroll = () => {
        if(window.scrollY > 0){
        setScroll(true);
        }else{
        setScroll(false);
        }
    };

  return [scroll]
};



    