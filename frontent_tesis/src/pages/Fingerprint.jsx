
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

function Fingerprint() {

  const {state} = useLocation();
  const { id,rol } = state; // Read values passed on state

  const navigate = useNavigate();

  return(
<>

<Box sx={{ width: '650px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}} alignItems="center">

    
<Grid container spacing={2} sx={{ padding: '25px', marginTop:"25px"}}>
      
      <Grid item xs={12} >
            <Grid  container spacing={2}>
                <Grid xs={12}style={{ textAlign: 'center'}} >
                <h2 style={{color: theme.palette.primary.dark,marginLeft:'auto', marginRight:'auto',}}>Please place finger in the Scanner</h2>
                <FingerprintIcon sx={{color: theme.palette.primary.dark,margin:'auto', width: '50%', height: 'auto' }}/>
                </Grid>


            </Grid>
      </Grid>


  <div style={{margin: '20px', marginLeft: 'auto',marginRight: 'auto'}}>
      <Button color='success' variant="contained" onClick={()=>{navigate("/Attendace", { state: { id: id,rol:rol } });}}>Complete registration</Button>
  </div>
</Grid>


</Box>
</>

  );
}

export default Fingerprint;

