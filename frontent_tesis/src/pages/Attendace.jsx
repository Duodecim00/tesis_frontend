
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import theme from '../color/color';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
//import Select from '@mui/material/Select';
//import MenuItem from '@mui/material/MenuItem';
//import InputLabel from '@mui/material/InputLabel';
//import FormControl from '@mui/material/FormControl';
//import Forminput from '../components/Forminput';
import './register.css';
//import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import { getStundetsByTeacher } from '../api/alumno.api';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GradeIcon from '@mui/icons-material/Grade';
//import FaceIcon from '@mui/icons-material/Face';
import EnhancedTable from '../components/TableWithChecks';
import Pdf from '../components/PDF';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';
function Attendace() {
  const {state} = useLocation();
  const { id,rol } = state; // Read values passed on state

  const navigate = useNavigate();
  return(

<>


<Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
<Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
Attendace Traker
</Typography>
    <Box sx={{ flexGrow: 1 }} />
<Stack direction="row" spacing={2}>   

  {rol==0&&
  <>

  <Button variant="contained" startIcon={<PersonIcon />} onClick={()=>{navigate("/Attendace", { state: { id: id,rol:rol } });}}>
        Attendance
    </Button>

  <Button variant="contained" startIcon={<EditNoteIcon />} onClick={()=>{navigate("/Grades", { state: { id: id,rol:rol } });}}>
        Manage Grades
    </Button>
    
    </>
}
    <Button sx={{background:'#3D3D3D'}} variant="contained" startIcon={<ExitToAppIcon />} onClick={()=>{navigate("/");}}>
        Exit 
    </Button>
</Stack>

</Toolbar>

<Box sx={{ width: '90%', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1, display:"flex",flexDirection:"row"}}alignItems="center">

    <Grid container spacing={2} sx={{ padding: '25px',}}>
      
        <Grid item xs={12} >
            <Grid >
              <div style={{marginBottom: 30}}>
                    <Stack direction="row" spacing={2}>   
                    </Stack>
              </div>
            </Grid>
              <Grid container >
                <EnhancedTable id={id} rol={rol}></EnhancedTable>
              </Grid>
        </Grid>
</Grid>



</Box>




</>
  );
}

export default  Attendace;

