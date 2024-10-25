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
  }, []);

  return (
    <>
      {mounted
        ? createPortal(
            <dialog className={classes} onClick={closePortal}>
              {children}
            </dialog>,
            element
          )
        : null}
    </>
  );
}
