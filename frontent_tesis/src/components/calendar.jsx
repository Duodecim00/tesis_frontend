import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import theme from '../color/color';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useState,useEffect,useRef } from 'react';
import { DeleteAttendance, GetAttendace, NewAttendanceEdit } from '../api/asistencia.api';
import { Alert, Button, colors } from '@mui/material';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getgradebystudentID, getstudentgrade } from '../api/curso.api';



export default function DateCalendarServerRequest(id) {

  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [highlightedDaysTime, setHighlightedDaysTime] = useState([]);
  const [TotalAttendance,setTotalAttendance] = useState([])
  const [TotalAttendanceTime,setTotalAttendanceTime] = useState([])
  const [before,setbefore] = useState()
  const [after,setafter] = useState()
  const [SameMonth,setSameMonth] = useState(true)
  const [daypicked,setdaypicked] = useState()
  const initialValue = dayjs();
  const today = new Date()
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const [days,setdays] = useState([])
  const [change,setchange] = useState(0)
  const [ActualMonth,setActualMonth] = useState()
  const [Validation, setValidation] = useState('');
  const [error,seterror] = useState(false)
  const [errorText,seterrorText] = useState('ErrorMsg')
  const [fechainicio,setfechainicio] =useState()
  const [fechafinal,setfechafinal] =useState()
  const [Success,setSuccess] = useState(false)
  const [note,setnote] = useState("")
  const [idGrade,setidGrade] = useState()
  const [daysnote,setdaysnote] = useState([])
  const [totaldaysnote,settotaldaysnote] = useState([])
  
  function ServerDay(props) {

    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const diasConTime = highlightedDaysTime
    const diasconnote = daysnote
    const StartDate = new Date(fechainicio)
    const FinalDate = new Date(fechafinal)

    if (StartDate.getMonth() != FinalDate.getMonth()) {
      setSameMonth(false);
    }else{
      setSameMonth(true);
    }


    let classday = false
    let daymissed = false
    let isSelected = false


      for (let index = 0; index < days.length; index++) {

        if (SameMonth) {
          if (
            props.day.date()>StartDate.getDate()-1 && 
            props.day.date()<FinalDate.getDate()+1 && 
            props.day.$d.getMonth()==StartDate.getMonth() && 
            props.day.$d.getFullYear()==StartDate.getFullYear() && 
            days[index].dia==weekday[props.day.$d.getDay()] 
          ) {
           classday = true
        }
        }else{
  if (true) {
  
      if (props.day.$d.getMonth()>StartDate.getMonth() && props.day.$d.getMonth()<FinalDate.getMonth() && props.day.$d.getFullYear()==StartDate.getFullYear()) {
        if (
          days[index].dia==weekday[props.day.$d.getDay()] 
        ) {
         classday = true
      }
      } else {
        if (props.day.$d.getMonth()==StartDate.getMonth() && props.day.$d.getFullYear()==StartDate.getFullYear()) {
          if (
            props.day.date()>StartDate.getDate()-1 && 
            days[index].dia==weekday[props.day.$d.getDay()] 
          ) {
           classday = true
        }
  
        }else{
          if (props.day.$d.getMonth()==FinalDate.getMonth() && props.day.$d.getFullYear()==StartDate.getFullYear()) {
            if (
              props.day.date()<FinalDate.getDate()+1 && 
              days[index].dia==weekday[props.day.$d.getDay()] 
            ) {
             classday = true
          }
          } else {
            
          }
        }
      }
          }
          else{
            if (props.day.$d.getMonth()==StartDate.getMonth() && props.day.$d.getFullYear()==StartDate.getFullYear()) {
              if (
                props.day.date()>StartDate.getDate()-1 && 
                days[index].dia==weekday[props.day.$d.getDay()] 
              ) {
               classday = true
            }
      
            }
        }
        }
        
      }

    

    

    const note =
    !props.outsideCurrentMonth && diasconnote.indexOf(props.day.date()) >= 0;


    for (let index = 0; index < diasConTime.length; index++) {
      if (diasConTime[index][0].getDate() == props.day.date()) {
        isSelected=true
      }
      if (diasConTime[index][0].getDate() == props.day.date()&&diasConTime[index][1] > days[0].horaStart) {
        isSelected=false
        daymissed=true
      } 
    }


    return (
      <Badge 
        key={props.day.toString()}
        overlap="circular"
        
        badgeContent={note ? '📌' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}   
        sx={{
        backgroundColor: isSelected ? colors.green[500] : 
        daymissed ? colors.yellow[700] :
        classday ? colors.red[500] : '#424542',
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
    setbefore(today.getMonth())
    const respuesta = await GetAttendace(id.id,id.IdCurso)
    const respuesta2 = await getgradebystudentID(id.id)
    if (respuesta[0]==400) {
      console.log("No Grade assigned")
    }else if (respuesta[0]==200) {
      setidGrade(respuesta2[1].grade[0]._id)
      console.log(respuesta2[1].grade[0]._id)
      setfechainicio(respuesta2[1].grade[0].fechaInicio)
      console.log(respuesta2[1].grade[0].fechaInicio)
      setfechafinal(respuesta2[1].grade[0].fechaFin)
      console.log(respuesta2[1].grade[0].fechaFin)
      setdays(respuesta2[1].classes)
      console.log(respuesta2[1].classes)
    }
   

    if (respuesta[0]==400) {
         
    }else if (respuesta[0]==200) {
      const days = []
      const times = []
      const totaldays = []
      const totaltimes = []
      const notes=[]
      const totalnotes=[]
      for (let index = 0; index < respuesta[1].attendance.length; index++) {
        const day = new Date(respuesta[1].attendance[index].fecha)
        const time = respuesta[1].attendance[index].hora
        const note = respuesta[1].attendance[index].nota

        if (ActualMonth) {
          if (day.getMonth() === ActualMonth) {
            days.push(day.getDate())
            times.push([day,time,note])

            if (respuesta[1].attendance[index].nota) {
              notes.push(day.getDate())
            }
          }

        }else{
          if (day.getMonth() === today.getMonth()) {
            days.push(day.getDate())
            times.push([day,time,note])

            if (respuesta[1].attendance[index].nota) {
              notes.push(day.getDate())
            }
          }

          

        }

        if (respuesta[1].attendance[index].nota) {
          totalnotes.push(day.getDate())
        }
        
        totaldays.push(day)
        totaltimes.push([day,time,note])
      }
      setTotalAttendance(totaldays)
      setHighlightedDays(days)
      setHighlightedDaysTime(times)
      setTotalAttendanceTime(totaltimes)
      setdaysnote(notes)
      settotaldaysnote(totaltimes)
      
    }
  }

  useEffect(()=>{
    getData()
  },[change])


  async function CreateAttendance() {
    if (Validation=="on time" || Validation=="late") {
      const respuesta = await NewAttendanceEdit(id.id,`${daypicked.$M + 1}/${daypicked.$D}/${daypicked.$y}`,Validation,note)
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
    }else{
      if (Validation=="non-attendant") {
        const respuesta = await DeleteAttendance(id.id,idGrade,`${daypicked.$M + 1}/${daypicked.$D}/${daypicked.$y}`)
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
      }else{
        seterror(true)
        setTimeout(() => {
          seterror(false)
        }, 5000);
        seterrorText("Select an attendance")
      }
     
    }
    


  }

  const handleMonthChange = (props) => {
    setActualMonth(props.$M)
    
    const days = []
    const daysTime = []
    const dayswithnote = []
      for (let index = 0; index < TotalAttendance.length; index++) {
        
        if (TotalAttendance[index].getMonth() === props.$M) {
          days.push(TotalAttendance[index].getDate())
        }
      
      }

      for (let index = 0; index < TotalAttendanceTime.length; index++) {
        if (TotalAttendanceTime[index][0].getMonth() === props.$M) {
          daysTime.push(TotalAttendanceTime[index])
        }
      
      }

      for (let index = 0; index < totaldaysnote.length; index++) {
        if (totaldaysnote[index][0].getMonth() === props.$M) {
          if (totaldaysnote[index][2] != "") {
            dayswithnote.push(totaldaysnote[index][0].getDate())
          }
          
        }
      
      }
      
      setHighlightedDays(days)
      setHighlightedDaysTime(daysTime)
      setdaysnote(dayswithnote)
    }


    function newpick(e) {
      setdaypicked(e)
      for (let index = 0; index < totaldaysnote.length; index++) {
        if (`${e.$M + 1}/${e.$D}/${e.$y}` === totaldaysnote[index][0].toLocaleDateString()) {
          if (totaldaysnote[index][2]) {
            setnote(totaldaysnote[index][2])
          }
        
          
        }
      
      }
    }



  return (
    <>
    
    <Grid item xs={4} sx={{ margin: 'auto'}}  style={{display:"flex",flexDirection:"column"}} alignItems={"center"}>
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DateCalendar
      disableHighlightToday
      value={daypicked} onChange={newpick}
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
                                    <InputLabel id="demo-simple-select-label">Attendance</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Validation}
                                        label="Validation"
                                       onChange={(e)=>{setValidation(e.target.value)}}
                                      >
                                        <MenuItem value={"on time"}>On time</MenuItem>
                                        <MenuItem value={"late"}>Late</MenuItem>
                                        <MenuItem value={"non-attendant"}>Non-attendant</MenuItem>
                                      </Select>
                                </FormControl>
                          </Grid>
                          <Grid item xs={9}>
                          </Grid>
                          <Grid item xs={12}>
                              <TextField sx={{width: '100%' }}
                              id="outlined-multiline-static"
                              label="Description"
                              multiline
                              value={note}
                              onChange={(e)=>{setnote(e.target.value)}}
                              rows={5}
                            />
                          </Grid>
                                <div style={{margin: '5px', marginLeft: 'auto',marginRight: 'auto'}}>
                                  <Button variant="contained" style={{ marginLeft: '10px',marginRight: '10px'}} sx={{backgroundColor:colors.green[400]}} onClick={()=>{CreateAttendance()}}>save</Button>
                                </div>
                        </Grid>
                    </Box>
                </Grid>

                
    
    </>
    
  );
}