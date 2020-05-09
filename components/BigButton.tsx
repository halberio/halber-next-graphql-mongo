import React from "react";
import { Button } from "antd";



interface Props {
  text: string;
  onClick:()=>void;
}
export const BigButton: React.FC<Props> = ({ text, onClick }) => {
    
  return <Button onClick={onClick}>{text}</Button>;
};
