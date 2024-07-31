import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../color/color';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import './register.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { getallteachers } from '../api/profesor.api';
import { CreateNewGrade } from '../api/curso.api';

function NewGrade() {

  const [Name,setName] = useState("");

  const [Teacher,setTeacher] = useState("");
  const [Seccion,setSeccion] = useState("");
  
  const [Weeks,setWeeks] = useState("");
  const [startDate,setstartDate] = useState();

  const [TimeStart,setTimeStart] = useState();
  const [timeEnd,setTimeEnd] = useState();

  const [days, setdays] = useState([]);

  const [teachers,setteachers] = useState()

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handledays = async (event, newdays) => {
    console.log(newdays)
    await setdays(newdays);
  };


  const handleTeacher = (event) => {
    setTeacher(event.target.value);
  };

  
  const handleSeccion = (event) => {
    setSeccion(event.target.value);

  };

  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };


  async function newGrado() {
    console.log(Name)
    console.log(Teacher)
    console.log(Seccion)
    console.log(Weeks)
    console.log(startDate)
    console.log(TimeStart)
    console.log(TimeStart.$d.toLocaleString())
    console.log(timeEnd)
    console.log(timeEnd.$d)
    console.log(days)
    CreateNewGrade(Name,Teacher,Seccion,Weeks,startDate,TimeStart.$d.toLocaleString(),timeEnd.$d.toLocaleString(),days)
  }

  async function getteachers() {
   const respuesta = await getallteachers()
    setteachers(respuesta)
  }

  useEffect(()=>{
    getteachers()
  },[])


  return(
<>
<Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <ArrowBackIcon sx={{color: theme.palette.primary.dark}} />
      </IconButton>
      <Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
        New Grade
      </Typography>
</Toolbar>

<Box sx={{ width: '650px', backgroundColor: theme.palette.primary.light, marginLeft: 'auto',marginRight: 'auto', borderRadius: 1}}alignItems="center">


    <Grid container spacing={2} sx={{ padding: '25px',}}>
      
        <Grid style={{
          display:'flex',
          flexDirection:'column'
        }} item xs={12} >
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                      <TextField sx={{width: '100%' }} id="outlined-basic" label="Grade Name" variant="outlined" value={Name} onChange={(e)=>{setName(e.target.value)}} />
                  </Grid>

                  <Grid item xs={6}>
                  <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Teacher}
                             label="Teacher"
                             onChange={handleTeacher}
                           >
                            {teachers&&teachers.map((teacher)=>{
                              return(
                                <MenuItem value={teacher._id}>{teacher.nombrecompleto}</MenuItem>
                              )
                            })}
                                
                                {/* <MenuItem value={20}>fer fer</MenuItem>
                                <MenuItem value={30}>ricardo ricardo</MenuItem> */}
  
                                
                       </Select>
                   </FormControl>
                   
                   <FormControl fullWidth style={{
        marginTop:"8px",
      }}>
                       <InputLabel id="demo-simple-select-label">Weeks</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Weeks}
                             label="Grado"
                             onChange={(e)=>{setWeeks(e.target.value)}}
                             MenuProps={MenuProps}
                           >
                                <MenuItem value={1}>1 Week</MenuItem>
                                <MenuItem value={2}>2 Weeks</MenuItem>
                                <MenuItem value={3}>3 Weeks</MenuItem>
                                <MenuItem value={4}>4 Weeks</MenuItem>
                                <MenuItem value={5}>5 Weeks</MenuItem>
                                <MenuItem value={6}>6 Weeks</MenuItem>
                                <MenuItem value={7}>7 Weeks</MenuItem>
                                <MenuItem value={8}>8 Weeks</MenuItem>
                                <MenuItem value={9}>9 Weeks</MenuItem>
                                <MenuItem value={10}>10 Weeks</MenuItem>
                                <MenuItem value={11}>11 Weeks</MenuItem>
                                <MenuItem value={12}>12 Weeks</MenuItem>
                                <MenuItem value={13}>13 Weeks</MenuItem>
                                    
                       </Select>
                   </FormControl>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>

        <TimePicker value={TimeStart}
        onChange={(newValue) => setTimeStart(newValue)}
        label="Start time" 
        slotProps={{ textField: { fullWidth:'true' }}}/>

      </DemoContainer>
    </LocalizationProvider>


                  </Grid>


                  <Grid item xs={6}>
                  <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label">Section</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={Seccion}
                             label="Grado"
                             onChange={handleSeccion}
                           >
                                <MenuItem value={10}>A</MenuItem>
                                <MenuItem value={20}>B</MenuItem>
                                <MenuItem value={30}>C</MenuItem>        
                       </Select>
                   </FormControl>
                   
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
        disablePast={true}
        shouldDisableDate={isWeekend}
        value={startDate}
        onChange={(newValue) => setstartDate(newValue)} 
        label="Start Date" 
        slotProps={{ textField: { fullWidth:'true' }}}/>
      </DemoContainer>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker  value={timeEnd}
        onChange={(newValue) => setTimeEnd(newValue)}label="End time" slotProps={{ textField: { fullWidth:'true' }}}/>
      </DemoContainer>
    </LocalizationProvider>


                  </Grid>
 
              </Grid>

              <h4 style={{color: theme.palette.primary.dark,marginLeft:'auto', marginRight:'auto',}}>Class days</h4>

              <ToggleButtonGroup
      value={days}
      onChange={handledays}
      aria-label="text formatting"
      style={{
        marginLeft:'auto',
        marginRight:'auto',
        position:"relative"
      }}
    >
      <ToggleButton value="Sunday" aria-label="bold" disabled style={{minWidth:75,minHeight:75}}>
      Sun
      </ToggleButton>
      <ToggleButton value="Monday" aria-label="bold" style={{minWidth:75,minHeight:75}}>
      Mon
      </ToggleButton>
      <ToggleButton value="Tuesday" aria-label="bold" style={{minWidth:75,minHeight:75}}>
      Tues
      </ToggleButton>
      <ToggleButton value="Wednesday" aria-label="bold" style={{minWidth:75,minHeight:75}}>
      Wed
      </ToggleButton>
      <ToggleButton value="Thursday" aria-label="bold" style={{minWidth:75,minHeight:75}}>
      Thurs
      </ToggleButton>
      <ToggleButton value="Friday" aria-label="bold" style={{minWidth:75,minHeight:75}}>
      Fri
      </ToggleButton>
      <ToggleButton value="Saturday" aria-label="bold" disabled style={{minWidth:75,minHeight:75}}>
      Sat
      </ToggleButton>
    </ToggleButtonGroup>
        </Grid>
        

    <div style={{margin: '20px', marginLeft: 'auto',marginRight: 'auto'}}>
        <Button onClick={()=>{newGrado()}} variant="contained">Continue</Button>
    </div>
</Grid>

</Box>
</>
  );
}

export default NewGrade;

