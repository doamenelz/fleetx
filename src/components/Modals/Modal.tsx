import { FC, Fragment } from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "./Modal.types";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export const ModalBackdrop: FC<ModalProps> = ({ children, selector }) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);
  return ref.current ? ReactDOM.createPortal(children, ref.current) : null;
};
