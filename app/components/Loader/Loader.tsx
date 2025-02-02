import React from "react";
import "./styles.css";

interface ILoaderProps {
  isLoading: boolean;
  message: string;
}

export default function Loader({ isLoading, message }: ILoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="bg-black bg-opacity-50 h-screen w-screen fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center">
        <div className="loader"></div>
        <strong className="text-white">{message}</strong>
      </div>
    </div>
  );
}
