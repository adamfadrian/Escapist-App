import React,{ FC } from "react";

interface Props {
    children: React.ReactNode
}

const Container :FC <Props>= ({ children }) => {
  {
    return <div className="flex w-full h-full bg-white">{children}</div>;
  }
};

export default Container;