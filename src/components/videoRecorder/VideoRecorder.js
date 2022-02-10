import React, { useEffect, useState, useRef } from "react";
import { makeStyles, Grid, Button, Dialog } from "@material-ui/core";
const videoType = "video/webm";
const VideoRecorder = () => {
  const classes = useStyles();
  const videoRef = useRef();
  const vid = useRef();
  const mediaRecorder = useRef();
  const [chunks, setChunks] = useState(null);
  const [recording, setRecording] = useState(false);
  const [video, setVideo] = useState("");

  const startRecording = (e) => {
    setChunks([]);
    mediaRecorder.current.start(10);
    setRecording(true);
    console.log("started");
  };

  const stopRecording = (e) => {
    mediaRecorder.current.stop();
    // say that we're not recording
    setRecording(false);
    // save the video to memory
    saveVideo();
    console.log("stopped");
  };

  const saveVideo = () => {
    // console.log(chunks);
    const blob = new Blob(chunks, { type: videoType });
    // generate video url from blob
    // const videoURL = new URL.createObjectURL(blob);
    console.log(blob);
    setVideo(URL.createObjectURL(blob.arrayBuffer));

    //   // append videoURL to list of saved videos for rendering
    //   const videos = this.state.videos.concat([videoURL]);
    //   this.setState({ videos });
  };
  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: videoType,
      });
      setChunks([]);
      mediaRecorder.current.ondataavailable = (e) => {
        const chunkData = [];
        if (e.data && e.data.size > 0) {
          chunkData.push(e.data);
        }
        setChunks(chunkData);
      };
    })();
  }, []);
  return (
    <Dialog open={true} maxWidth={false}>
      <Grid container direction="column" className={classes.container}>
        <video ref={videoRef} className={classes.video} src="" />
        <video src={video} autoPlay></video>
        <Grid item container>
          <Button variant="contained" onClick={startRecording} color="primary">
            Start Recording
          </Button>
          <Button variant="contained" onClick={stopRecording} color="primary">
            Stop Recording
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default VideoRecorder;

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "10px",
      backgroundColor: "#ffffff",
    },
  },
  container: {},
  button: {},
  video: {
    width: "700px",
  },
}));

// import React from "react";
// import { Dialog, makeStyles, Grid, Button } from "@material-ui/core";
// const videoType = "video/webm";

// export default class VideoRecorder extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       recording: false,
//       videos: [],
//     };
//   }

//   async componentDidMount() {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     // show it to user
//     this.video.srcObject = stream;
//     this.video.play();
//     // init recording
//     this.mediaRecorder = new MediaRecorder(stream, {
//       mimeType: videoType,
//     });
//     // init data storage for video chunks
//     this.chunks = [];
//     // listen for data from media recorder
//     this.mediaRecorder.ondataavailable = (e) => {
//       if (e.data && e.data.size > 0) {
//         this.chunks.push(e.data);
//       }
//     };
//   }

//   startRecording(e) {
//     e.preventDefault();
//     // wipe old data chunks
//     this.chunks = [];
//     // start recorder with 10ms buffer
//     this.mediaRecorder.start(10);
//     // say that we're recording
//     this.setState({ recording: true });
//   }

//   stopRecording(e) {
//     e.preventDefault();
//     // stop the recorder
//     this.mediaRecorder.stop();
//     // say that we're not recording
//     this.setState({ recording: false });
//     // save the video to memory
//     this.saveVideo();
//   }

//   saveVideo() {
//     // convert saved chunks to blob
//     const blob = new Blob(this.chunks, { type: videoType });
//     // generate video url from blob
//     const videoURL = window.URL.createObjectURL(blob);
//     // append videoURL to list of saved videos for rendering
//     const videos = this.state.videos.concat([videoURL]);
//     this.setState({ videos });
//   }

//   deleteVideo(videoURL) {
//     // filter out current videoURL from the list of saved videos
//     const videos = this.state.videos.filter((v) => v !== videoURL);
//     this.setState({ videos });
//   }

//   render() {
//     const { recording, videos } = this.state;
//     // const classes = styles();
//     // const { open } = this.props;

//     return (
//       <Dialog
//         open={true}
//         maxWidth={false}
//         style={{
//           "& .MuiDialog-paper": {
//             borderRadius: "10px",
//             backgroundColor: "#ffffff",
//           },
//         }}
//       >
//         <Grid container direction="column" style={{ position: "relative" }}>
//           <video
//             style={{ width: "60vh" }}
//             ref={(v) => {
//               this.video = v;
//             }}
//           >
//             Video stream not available.
//           </video>
//           <Grid
//             item
//             container
//             style={{
//               position: "relative",
//               bottom: 0,
//               left: 0,
//               width: "100%",
//               background: "red",
//               padding: "0.5rem",
//             }}
//           >
//             <div>
//               {!recording && (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   style={{
//                     textTransform: "none",
//                   }}
//                   onClick={(e) => this.startRecording(e)}
//                 >
//                   Record
//                 </Button>
//               )}
//               {recording && (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   style={{
//                     textTransform: "none",
//                   }}
//                   onClick={(e) => this.stopRecording(e)}
//                 >
//                   Stop
//                 </Button>
//               )}
//             </div>
//             <div>
//               <h3>Recorded videos:</h3>
//               {videos.map((videoURL, i) => (
//                 <div key={`video_${i}`}>
//                   <video style={{ width: 200 }} src={videoURL} autoPlay loop />
//                   <div>
//                     <button onClick={() => this.deleteVideo(videoURL)}>
//                       Delete
//                     </button>
//                     <a href={videoURL}>Download</a>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Grid>
//         </Grid>
//       </Dialog>
//     );
//   }
// }
