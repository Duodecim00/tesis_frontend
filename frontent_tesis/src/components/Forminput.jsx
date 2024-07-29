import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getStundetsByTeacher } from '../api/alumno.api';
import { getstudentgrade } from "../api/curso.api";
import { colors } from '@mui/material';

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
    label: 'Attendance',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

// function createData(ID, LName,FName,Advisor,Grade, Section,Email,Attendance) {
//   return { _id, LName,FName,Advisor,Grade,Section,Email,Attendance };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263,2222,3333,44,55),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

function Forminput(id) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setrows] = React.useState([])


  async function getstudentsdata() {
    setrows([])
    const respuesta = await getStundetsByTeacher(id.id)
    for (let index = 0; index < respuesta.length; index++) {
      const nombre = respuesta[index].nombrecompleto.split(' ');
      const result = await getstudentgrade(respuesta[index].id_curso)
      const student ={
        ID:respuesta[index].cedula,
        LName:nombre[1],
        FName:nombre[0],
        Gender:respuesta[0].genero,
        Age:respuesta[0].edad,
        Grade:result[0].nombreCurso,
        Section:result[0].seccion,
        Attendance:'90%'
      }
      setrows([...rows, student]);
      
    }
  }

  React.useEffect(()=>{
    getstudentsdata()
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
  
   <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {rows&&rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={"center"} style={{
                          backgroundColor: value == '90%' ? colors.green[400] : 'white',
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   
  )
}

export default Forminput;