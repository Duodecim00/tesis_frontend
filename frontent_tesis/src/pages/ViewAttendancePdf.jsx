import React, { useEffect, useState } from 'react';
import Pdf from '../components/PDF';
import { PDFDownloadLink, PDFViewer, usePDF } from '@react-pdf/renderer';
import { Box, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import theme from '../color/color';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStudentByID } from '../api/alumno.api';
import { GetAttendace } from '../api/asistencia.api';

function ViewAttendancePdf(props) {
  const {state} = useLocation();
  const { id,rol,idfila } = state; // Read values passed on state
  const [data, setData] = useState([]);
  const [asistencias,setasistencias] = useState()
  const [dataAlumnos,setdataAlumnos] = useState()
  const navigate = useNavigate();
  const [instance, updateInstance] = usePDF({ document: <Pdf/> })

  async function GetDataStudents() {
    let dataAttendance = []
    let DataStudents = []

      for (let index = 0; index < idfila.length; index++) {

        const respuestaDataStudent = await getStudentByID(idfila[index])
            DataStudents.push(respuestaDataStudent[1])

        
        const respuesta = await GetAttendace(idfila[index])
        for (let index = 0; index < respuesta[1].attendance.length; index++) {
            dataAttendance.push(respuesta[1].attendance[index])
        }
        
    }
    setasistencias(dataAttendance)
    setdataAlumnos(DataStudents)
    
}

  useEffect(()=>{
    GetDataStudents()
  },[])

    return (
      <>
     <Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>{navigate("/Attendace", { state: { id: id,rol:rol } });}}>
        <ArrowBack sx={{color: theme.palette.primary.dark}} />
      </IconButton>
      <Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
        Print Attendance
      </Typography>
</Toolbar>

<div style={{display:"flex", width:"100%",height:"100%"}}>

  

{instance.loading&&
            <Box sx={{ display: 'flex', width:"100%",height:"80%",marginTop:"10px",position:"absolute",justifyContent:"center",alignContent:"center",alignItems:"center" }}>
            <CircularProgress sx={{marginLeft:"auto",marginRight:"auto"}} />
          </Box>
           }

  {asistencias&&dataAlumnos&&<PDFViewer style={{marginLeft:"auto",marginRight:"auto",backgroundColor:"#404040"}} showToolbar={true} width={1460} height={640}>
        <Pdf asistencias={asistencias} dataAlumnos={dataAlumnos}/>
      </PDFViewer>}
      
    </div>


      </>
        
    );
}

export default ViewAttendancePdf;