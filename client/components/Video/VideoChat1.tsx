"use client"
import React, { useEffect } from 'react';
import { Typography,AppBar } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import Options from './Options';
import Notifications from './Notifications';
type VideoChat1Props = {
    
};
// const useStyles = makeStyles((theme:any) => ({
//     appBar: {
//       borderRadius: 15,
//       margin: '30px 100px',
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: '600px',
//       border: '2px solid black',
  
//       [theme.breakpoints.down('xs')]: {
//         width: '90%',
//       },
//     },
  
//     wrapper: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       width: '100%',
//     },
//   }));
const VideoChat1:React.FC<VideoChat1Props> = () => {
    
   

    return (
    <><div className='flex flex-col justify-center items-center' >
        {/* <AppBar position='static' color='inherit' >
            <Typography variant='h2' align='center'>
                Video Call
        </AppBar> </Typography>*/}
        <h1 className='text-center text-lg font-bold'>Video Call</h1>
         <div className=''>
         <VideoPlayer />
            <Options >
            <Notifications />
            </Options >
            </div>   
    </div></>)
}
export default VideoChat1;