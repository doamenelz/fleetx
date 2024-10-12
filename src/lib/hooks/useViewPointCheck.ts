export enum VIEW_PORT_TYPE {
  mobile,
  tablet,
  laptop,
  ultra,
}
import { useEffect, useState } from "react";
export function useViewPointCheck() {
  const [width, setWidth] = useState<number>(767);
  const [viewPort, setViewPort] = useState(VIEW_PORT_TYPE.ultra);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  switch (true) {
    case width < 768: //Mobile
      setViewPort(VIEW_PORT_TYPE.mobile);
      break;
    case width < 1024: //Tablet Mini
      setViewPort(VIEW_PORT_TYPE.tablet);
      break;
    case width < 1440: //Laptop
      setViewPort(VIEW_PORT_TYPE.laptop);
      break;
    case width >= 1440: //Ultra
      setViewPort(VIEW_PORT_TYPE.ultra);
      break;

    default:
      setViewPort(VIEW_PORT_TYPE.mobile);
      break;
  }
  return viewPort;
}
