import React ,{createContext, useEffect, useRef, useState} from "react"
import {io} from "socket.io-client"
import Peer from "simple-peer";

interface SocketContextType {
    call: any; // Replace 'any' with the appropriate type for 'call'
    callAccepted: boolean;
    myVideo: React.MutableRefObject<HTMLVideoElement | null>;
    userVideo: React.MutableRefObject<HTMLVideoElement | null>;
    stream: MediaStream | undefined; // Add the 'stream' property with correct type
    name: string; // Add the 'name' property with correct type
    setName: React.Dispatch<React.SetStateAction<string>>; // Add the 'setName' property with correct type
    callEnded: boolean;
    me: string;
    callUser: (id: string) => void; // Add the 'callUser' property with correct type
    leaveCall: () => void;
    answerCall: () => void;
  }
  
  const SocketContext =createContext<SocketContextType>({
    call: null,
    callAccepted: false,
    myVideo: { current: null },
    userVideo: { current: null },
    stream: undefined,
    name: "",
    setName: () => {},
    callEnded: false,
    me: "",
    callUser: () => {},
    leaveCall: () => {},
    answerCall: () => {},
  });
const socket=io('http://localhost:5000'); // here put the url of deployed server when deployed

const ContextProvider=({ 
    children 
  }: { 
    children: React.ReactNode 
  })=>{

const [stream,setStream]=useState<MediaStream | undefined>(undefined);
const [me,setMe]=useState('');
const myVideo=useRef<HTMLVideoElement | null>(null);
const userVideo=useRef<HTMLVideoElement | null>(null);
const connectionRef=useRef<Peer.Instance | null>(null);
const [call,setCall]=useState<any>({});
const [callAccepted,setCallAccepted]=useState(false);
const[callEnded,setCallEnded]=useState(false);
const [name,setName]=useState('');

    const answerCall=()=>{
         setCallAccepted(true);

         const peer= new Peer({initiator:false , trickle:false,stream});
         peer.on('signal',(data:any)=>{
            socket.emit('answercall',{signal:data,to:call.from});
         })

         peer.on('stream',(currentStream:any)=>{
            userVideo.current!.srcObject=currentStream;
         })
         peer.signal(call.signal)

         connectionRef.current!=peer;
    }

    const callUser=(id:any)=>{
        const peer= new Peer({initiator:true , trickle:false,stream});
        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
          });

         peer.on('stream', (currentStream) => {
      userVideo.current!.srcObject = currentStream;
    });
    socket.on('callAccepted', (signal) => {
        setCallAccepted(true);
  
        peer.signal(signal);
      });
      connectionRef.current!=peer;
    }
    const leaveCall=()=>{
        setCallEnded(true);

        connectionRef.current!.destroy();
        window.location.reload(); //simply reloads the page
    }

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentStream)=>{
            setStream(currentStream);
         myVideo.current!.srcObject=currentStream;
        });

        socket.on('me',(id)=>{
            setMe(id);
        })
        socket.on('calluser',({from,name:callerName,signal})=>{
                setCall({isReceivedCall:true, from, name:callerName,signal});
        })

    },[])


    return (
        <SocketContext.Provider  value={{ call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export{ ContextProvider, SocketContext};