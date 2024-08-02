import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getallstudents, getStundetsByTeacher } from '../api/alumno.api';
import { GetGrades, getstudentgrade, getTeacherGrades } from "../api/curso.api";
import { Box, CircularProgress, colors, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
const columns = [

  { 
    id: 'ID', 
    label: 'Student ID', 
    minWidth: 80,
    format: (value) => value.toFixed(2)
  },

  { id: 'LName', 
    label: 'Last Name', 
    minWidth:  80,
    format: (value) => value.toFixed(2),

  },
  {
    id: 'FName',
    label: 'First Name',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Gender',
    label: 'Gender',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Age',
    label: 'Age',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Grade',
    label: 'Grade',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },{
    id: 'Section',
    label: 'Section',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Attendance',
    label: 'Attendance %',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];


function Forminput(id,rol) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setrows] = React.useState([])
  const [rowsfiltred,setrowsfiltred] = React.useState([])
  const [error,seterror] = React.useState(false)
  const [errorText,seterrorText] = React.useState('error')
  const [loading,setloading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [grades,setgrades] = React.useState([])
  const [grade,setgrade] = React.useState("")



  async function getstudentsdata() {
    if (id.rol===0) {
      const respuesta = await getallstudents()
      const data = []
    if (respuesta[0]==400) {
      seterror(true)
      seterrorText(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      
      for (let index = 0; index < respuesta[1].length; index++) {
      const nombre = respuesta[1][index].nombrecompleto.split(' ');
     
      const result = await getstudentgrade(respuesta[1][index].id_curso)

      const student ={
        ID:respuesta[1][index].cedula,
        LName:nombre[1],
        FName:nombre[0],
        Gender:respuesta[1][index].genero,
        Age:respuesta[1][index].edad,
        Grade:result[0].nombreCurso,
        Section:result[0].seccion,
        Attendance:`${Math.trunc(respuesta[1][index].percentage)}%`
      }
      data.push(student)
      
    }
    setrows(data)
    }
    }else{
      const respuesta = await getStundetsByTeacher(id.id)
      const data = []
    if (respuesta[0]==400) {
      seterror(true)
      seterrorText(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      
      for (let index = 0; index < respuesta[1].length; index++) {
      const nombre = respuesta[1][index].nombrecompleto.split(' ');
     
      const result = await getstudentgrade(respuesta[1][index].id_curso)

      const student ={
        ID:respuesta[1][index].cedula,
        LName:nombre[1],
        FName:nombre[0],
        Gender:respuesta[1][index].genero,
        Age:respuesta[1][index].edad,
        Grade:result[0].nombreCurso,
        Section:result[0].seccion,
        Attendance:`${Math.trunc(respuesta[1][index].percentage)}%`
      }
      data.push(student)
      
    }
    setrows(data)
    }
    }
    
  }

  async function setteachersGrades() {
    if (id.rol==0) {
      const respuesta = await GetGrades()
    console.log(respuesta)
    if (respuesta[0]==400) {
    }else if (respuesta[0]==200) {
      setgrades(respuesta[1])
    }
    }else{
      const respuesta = await getTeacherGrades(id.id)
      console.log(respuesta)
      if (respuesta[0]==400) {
      }else if (respuesta[0]==200) {
        setgrades(respuesta[1])
      }
    }
    
  }

  React.useEffect(()=>{
    getstudentsdata()
    setteachersGrades()
  },[])


  //chequea cada vez que se cambia el valor search y filtra la data
  React.useEffect(() => {
    const timeout = setTimeout(async () => {
      if(rows.length != 0) {
        await setrowsfiltred(filterDataBySearch(rows))
        setPage(0);
        setloading(false)
      }
    }, 500);
    return () => clearTimeout(timeout);
  }
  , [rows, search]) 

//funcion para filtar la data
  const filterDataBySearch = (data) => {
    if(!data) return []
    if(!search) return data
    // return data.filter(item => item.packing_code.includes(searchCode))
    // set all to lower case
    const lowerSearchCode = search.toLowerCase()

    if (data.filter(item => item.ID.toLowerCase().includes(lowerSearchCode)).length==0) {
    }
    return data.filter(item => (item.ID.toLowerCase().includes(lowerSearchCode) || item.FName.toLowerCase().includes(lowerSearchCode) || item.LName.toLowerCase().includes(lowerSearchCode)))
  }


  React.useEffect(() => {
    const timeout = setTimeout(async () => {
      if(rows.length != 0) {
        await setrowsfiltred(SearchByGrade(rows))
        setPage(0);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }
  , [grade]) 

//funcion para filtar la data
  const SearchByGrade = (data) => {
    if(!data) return []
    if(!grade) return data
    // return data.filter(item => item.packing_code.includes(searchCode))
    // set all to lower case
    const lowerSearchCode = grade.toLowerCase()

    if (data.filter(item => item.ID.toLowerCase().includes(lowerSearchCode)).length==0) {
    }
    return data.filter(item => (item.Grade.toLowerCase().includes(lowerSearchCode)))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
  <>
  
  <FormControl sx={{width: '20%',marginBottom:"10px",marginRight:"10px"}}>

  <TextField
        id="input-with-icon-textfield"
        label="Search"
        value={search}
        onChange={(e)=>{console.log(search)
          setSearch(e.target.value)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
                   </FormControl>
                   <FormControl sx={{width: '20%'}}>
                       <InputLabel id="demo-simple-select-label">Grades</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={grade}
                             label="Grades"
                             onChange={(e)=>{
                              setgrade(e.target.value)  
                             }}
                           >
                            <MenuItem value={""}>Todos</MenuItem>
                            {
                              grades&&grades.map((grade)=>{
                                return(
                                <MenuItem key={grade._id} value={grade.nombreCurso}>{grade.nombreCurso}</MenuItem>
                                )
                              })
                            }
                                
                                
                       </Select>
                   </FormControl>

   <Paper sx={{ width: '100%', overflow: 'hidden'}}>

   
   

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={"center"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsfiltred&&rowsfiltred
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={"center"} style={{
                          backgroundColor: 
                          column.id=='Attendance'&& value.substring(0, value.length - 1) <= 50 ? colors.red[700] : 
                          column.id=='Attendance'&& value.substring(0, value.length - 1) <= 75 ? colors.yellow[700] :
                          column.id=='Attendance'&& value.substring(0, value.length - 1) > 75 ? colors.green[400] :
                          'white',
                        }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {!error&&loading&&
            <Box sx={{ display: 'flex', width:"100%",marginTop:"10px" }}>
            <CircularProgress sx={{marginLeft:"auto",marginRight:"auto"}} />
          </Box>
           }
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowsfiltred.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

{error&&<Alert severity="error" style={{position:'relative',bottom:50,marginLeft:"auto",marginRight:"auto"}}>
          {errorText}
          </Alert>}
    </Paper>
   
    </>
  )
}

export default Forminput;