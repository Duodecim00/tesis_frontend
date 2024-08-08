import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import theme from '../color/color';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useState,useEffect,useRef } from 'react';
import { GetAttendace, NewAttendanceEdit } from '../api/asistencia.api';
import { Alert, Button, colors } from '@mui/material';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function DateCalendarServerRequest(id) {

  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [daypicked,setdaypicked] = useState()
  const initialValue = dayjs();
  const today = new Date()
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const [TotalAttendance,setTotalAttendance] = useState([])
  const [change,setchange] = useState(0)
  const [ActualMonth,setActualMonth] = useState()
  const [Validation, setValidation] = useState('');
  const [error,seterror] = useState(false)
  const [errorText,seterrorText] = useState('ErrorMsg')

  const [Success,setSuccess] = useState(false)

  
  function ServerDay(props) {
    
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
      const daymissed = 
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > today.getDate();
    return (
      <Badge 
      
        key={props.day.toString()}
        overlap="circular"
        //badgeContent={isSelected ? '🟢' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}   sx={{backgroundColor: isSelected ? colors.green[500] : daymissed ? colors.red[500] : '#424542',
          color: '#fff'}} />
  
      </Badge>
    );
  }
  
  function CalendarWeeks(props) {
    const weekdays = ["S","M","T","W","T","F","S"];
    return (
     <h style={{color:"white"}}>{weekdays[props.$W]}</h>
    )
  }

  async function getData() {
    const respuesta = await GetAttendace(id.id)
    if (respuesta[0]==400) {
         
    }else if (respuesta[0]==200) {
      const days = []
      const totaldays = []
      for (let index = 0; index < respuesta[1].attendance.length; index++) {
        const day = new Date(respuesta[1].attendance[index].fecha)

        if (ActualMonth) {
          if (day.getMonth() === ActualMonth) {
            days.push(day.getDate())
          }
        }else{
          if (day.getMonth() === today.getMonth()) {
            days.push(day.getDate())
          }
        }
        
        
        totaldays.push(day)
      }
      setTotalAttendance(totaldays)
      setHighlightedDays(days)
    }
  }

  useEffect(()=>{
    getData()
  },[change])


  async function CreateAttendance() {
    const respuesta = await NewAttendanceEdit(id.id,`${daypicked.$M + 1}/${daypicked.$D}/${daypicked.$y}`)
    if (respuesta[0]==400) {
      seterror(true)
      setTimeout(() => {
        seterror(false)
      }, 5000);
      seterrorText(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      setSuccess(true)
      if (change==0) {
        setchange(1)
      }else{
        setchange(0)
      }
        setTimeout(() => {
          setSuccess(false)   
        }, 5000);
        seterrorText(respuesta[1].msg)
      
    }


  }

  const handleMonthChange = (props) => {
    setActualMonth(props.$M)
    const days = []
      for (let index = 0; index < TotalAttendance.length; index++) {
        
        if (TotalAttendance[index].getMonth() === props.$M) {
          days.push(TotalAttendance[index].getDate())
        }
      
      }
      setHighlightedDays(days)
    }

    const handleChange = (event) => {
      setValidation(event.target.value);}

  return (
    <>
    
    <Grid item xs={4} sx={{ margin: 'auto'}}  style={{display:"flex",flexDirection:"column"}} alignItems={"center"}>
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DateCalendar
      disableHighlightToday
      value={daypicked} onChange={(e)=>{setdaypicked(e)}}
      dayOfWeekFormatter={CalendarWeeks}
      onMonthChange={handleMonthChange}
      sx={{backgroundColor: theme.palette.primary.dark,borderRadius: 1}}
        defaultValue={initialValue}
        loading={isLoading}
        // onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          leftArrowIcon: { sx:{color:"white"} },
          rightArrowIcon: { sx:{color:"white"} },
          day: {
            highlightedDays,
          },
        }}
      />


    </LocalizationProvider>


    {error&&<Alert severity="error" style={{position:'absolute',bottom:10, marginLeft:"auto",marginRight:"auto"}}>
          {errorText}
          </Alert>}

          {Success&&<Alert severity="success" style={{position:'absolute',bottom:10, marginLeft:"auto",marginRight:"auto"}}>{errorText}</Alert>}
                </Grid>
                <Grid item xs={8} sx={{ margin: 'auto'}} >
                    <Box sx={{ backgroundColor: theme.palette.primary.light, borderRadius: 1}} alignItems="center">
                          <Grid container spacing={2} sx={{ padding: '25px'}}>
                          <Grid item xs={3}>
                                <FormControl fullWidth  >
                                    <InputLabel id="demo-simple-select-label">count day</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Validation}
                                        label="Validation"
                                       onChange={(e)=>{setValidation(e.target.value)}}
                                      >
                                        <MenuItem value={10}>on time</MenuItem>
                                        <MenuItem value={20}>late</MenuItem>
                                        <MenuItem value={30}>non-attendant</MenuItem>
                                      </Select>
                                </FormControl>
                          </Grid>
                          <Grid item xs={9}>
                          <TextField sx={{width: '100%' }} id="outlined-basic" label="reason" variant="outlined" />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField sx={{width: '100%' }}
                              id="outlined-multiline-static"
                              label="description"
                              multiline
                              rows={5}
                              defaultValue="Default Value"
                            />
                          </Grid>
                                <div style={{margin: '5px', marginLeft: 'auto',marginRight: 'auto'}}>
                                  <Button variant="contained" style={{ marginLeft: '10px',marginRight: '10px'}} onClick={()=>{CreateAttendance()}}>save</Button>
                                </div>
                        </Grid>
                    </Box>
                </Grid>

                
    
    </>
    
  );
}