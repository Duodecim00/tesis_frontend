
import Box from '@mui/material/Box';
import theme from '../color/color';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { colors } from '@mui/material';

function Fingerprint() {

  const {state} = useLocation();
  const { id,rol,idStudent } = state;
  const [message, setmessage] = useState("Please place finger in the Scanner") // Read values passed on state
  const navigate = useNavigate();
  const [isPaused, setPause] = useState(false);
  const [finish, setFinish] = useState(true)
  const [stage,setStage] = useState(0)
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.1.102:81");
    ws.current.onopen = () =>  AddFingerPrint();
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;

    return () => {
        wsCurrent.close();
    };
}, []);


useEffect(() => {
  if (!ws.current) return;

  ws.current.onmessage = e => {
      if (isPaused) return;
      setmessage(e.data)
      if (e.data == "Place same finger again") {
        setStage(1)
      }else{
        if (e.data == "Stored!") {
          setStage(2)
          setFinish(false)
        }
      }
  };
}, [isPaused]);


  async function AddFingerPrint(params) {
 
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }}
    const url = `http://localhost:3000/AddFingerPrintESP32/${idStudent}`;
try {
const response = await fetch(url,requestOptions);
if (!response.ok) {
  throw new Error(`Response status: ${response.status}`);
  
}
} catch (error) {
console.error(error.message);
}
  }


  return(
<>

<Box sx={{ width: '650px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}} alignItems="center">

    
<Grid item={true} container spacing={2} sx={{ padding: '25px', marginTop:"25px"}}>
      
      <Grid item xs={12} >
            <Grid  container spacing={2}>
                <Grid xs={12}style={{ textAlign: 'center'}} >
                <h2 style={{color: theme.palette.primary.dark,marginLeft:'auto', marginRight:'auto',}}>{message}</h2>
                <FingerprintIcon sx={{margin:'auto', width: '50%', height: 'auto',
                  color: 
                  stage == 0 ? "black" :
                  stage == 1 ? colors.purple[400] :
                  stage == 2 ? colors.green[400] :
                  "black"
                 }}/>
                </Grid>
            </Grid>
      </Grid>


  <div style={{margin: '20px', marginLeft: 'auto',marginRight: 'auto'}}>
      <Button color='success' variant="contained" disabled={finish} onClick={()=>{navigate("/Attendace", { state: { id: id,rol:rol } });}}>Complete registration</Button>
  </div>
</Grid>


</Box>
</>

  );
}

export default Fingerprint;

