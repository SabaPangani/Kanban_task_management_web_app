"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
  classes: string;
  closePortal: () => void;
};

export default function Portal({
  children,
  classes,
  closePortal,
}: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const element = document.getElementById("modal-root") as Element;

  useEffect(() => {
    setMounted(true);
    console.log(classes)
  }, []);

  return (
    <>
      {mounted
        ? createPortal(
            <div className={classes} onClick={closePortal}>
              {children}
            </div>,
            element
          )
        : null}
    </>
  );
}
