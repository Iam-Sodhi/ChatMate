"use client"
import React, { ReactNode,useState } from "react";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSocketContext } from "@/context/SocketContext";
type OptionsProps = {
  children: ReactNode;
};

const Options: React.FC<OptionsProps> = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =useSocketContext();
   
  const [idToCall, setIdToCall] = useState("");
  console.log("me in options is",me);
  return (
    <div>
      Options
      <form action="" autoComplete="off" noValidate className="flex flex-col justify-center items-start gap-5">
        <div>
          <label htmlFor="Name">Account Info </label>
          <textarea
            name="Name"
            id="Name"
            value={name}
            className="bg-gray-400"
            onChange={(e) => setName(e.target.value)}
          ></textarea>
           
          <CopyToClipboard text={me}>
            <p className="w-full text-lg"><Assignment/> Copy Your ID </p>
          </CopyToClipboard>
        </div>
        <div>
          <label htmlFor="Call">Make a Call  </label>
          <textarea
            name="Call"
            id="Call"
            value={idToCall}
            className="bg-gray-400"
            onChange={(e) => setIdToCall(e.target.value)}
          ></textarea>
          {callAccepted && !callEnded ? (
            <button className="w-full text-lg" onClick={leaveCall}><PhoneDisabled/> Hang up </button>
          ) : (
            <button className="w-full text-lg" onClick={()=>callUser(idToCall)}><Phone /> Call </button>
          )}
        </div>
      </form>
      {children}
      
    </div>
  );
};
export default Options;
