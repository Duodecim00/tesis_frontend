
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import theme from '../color/color';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Forminput from '../components/Forminput';
import './register.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStundetsByTeacher } from '../api/alumno.api';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GradeIcon from '@mui/icons-material/Grade';
import FaceIcon from '@mui/icons-material/Face';

function Attendace() {
  const {state} = useLocation();
  const { id } = state; // Read values passed on state

  const navigate = useNavigate();


  return(

<>
<Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
<Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
Attendace Traker
</Typography>
    <Box sx={{ flexGrow: 1 }} />
<Stack direction="row" spacing={2}>   
    <Button variant="contained" startIcon={<PersonAddIcon />} onClick={()=>{navigate("/RegisterS", { state: { id: id } });}}>
        New Student
    </Button>
    <Button variant="contained" startIcon={<GradeIcon />} onClick={()=>{navigate("/NewGrade", { state: { id: id } });}}>
        New Grade
    </Button>
    <Button variant="contained" startIcon={<FaceIcon />} onClick={()=>{navigate("/RegisterT", { state: { id: id } });}}>
        New Teacher
    </Button>
    <Button variant="contained" startIcon={<ExitToAppIcon />} onClick={()=>{navigate("/");}}>
        Exit 
    </Button>
</Stack>

</Toolbar>

<Box sx={{ width: '90%', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}}alignItems="center">

9
    <Grid container spacing={2} sx={{ padding: '25px',}}>
      
        <Grid item xs={12} >
            <Grid >
              <div style={{marginBottom: 30}}>
                    <Stack direction="row" spacing={2}>   
                    <FormControl sx={{width: '20%'}}>
                       <InputLabel id="demo-simple-select-label">Grado</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             
                             label="Grado"
                            
                           >
                                <MenuItem value={10}>1.º</MenuItem>
                                <MenuItem value={20}>2.º</MenuItem>
                                <MenuItem value={30}>3.º</MenuItem>
                                <MenuItem value={40}>4.º</MenuItem>
                                <MenuItem value={50}>5.º</MenuItem>
                                <MenuItem value={60}>6.º</MenuItem>
                                
                       </Select>
                   </FormControl>
                   <FormControl sx={{width: '20%'}}>
                       <InputLabel id="demo-simple-select-label">Grado</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             
                             label="Grado"
                             
                           >
                                <MenuItem value={10}>1.º</MenuItem>
                                <MenuItem value={20}>2.º</MenuItem>
                                <MenuItem value={30}>3.º</MenuItem>
                                <MenuItem value={40}>4.º</MenuItem>
                                <MenuItem value={50}>5.º</MenuItem>
                                <MenuItem value={60}>6.º</MenuItem>
                                
                       </Select>
                   </FormControl>
                    </Stack>
              </div>
            </Grid>
              <Grid container >
                 <Forminput id={id}/>
              </Grid>
        </Grid>
</Grid>

</Box>
</>
  );
}

export default  Attendace;

