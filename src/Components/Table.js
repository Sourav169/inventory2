import React ,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import  Dotenv from "dotenv"
import ModalEdit from './ModalEdit'
import Axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 850,
  },
});

Dotenv.config()


/*const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

export default function BasicTable(props) {
  console.log(props.val);
  const classes = useStyles();
  const [rows,setRows]=useState([])
  const [filtersearch,setFiltersearch]=useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(()=>{
    axios.get(`http://localhost:8080/customers/getAllCustomers?pageNumber=${page}&pageSize=${rowsPerPage}&sortBy=firstName&sortOrder=ASC`)
    .then((res)=>{
      console.log(res);
       setRows(res.data.content);
    }).catch((err)=>{
      console.log(err.data);
    })
    setFiltersearch(
      rows.filter(row=>{
        return row.firstName.toLowerCase().includes(props.val.toLowerCase())
      })
    )
   
  },[rows])

  const handledelet=(event,id)=>{
    event.preventDefault();
    const row1=rows.filter(item=>item.id!=id);
    setRows(row1)
    axios.delete(`http://localhost:8080/customers/deleteCustomer/${id}`)
    .then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
    
  }

  const handleChangePage = (event, newPage) => {  
        setPage(newPage);  
      };  
   
      const handleChangeRowsPerPage = event => {  

        setRowsPerPage(+event.target.value);  

        setPage(0);  
      };  

  return (
    <Paper className={classes.root}> 
    <TableContainer className = {classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">FirstName</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">ContactNo</TableCell>
            <TableCell align="right">LandLine</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filtersearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.contactNumber}</TableCell>
              <TableCell align="right">{row.landline}</TableCell>
              <TableCell align="right"> <button onClick={(event)=>handledelet(event,row.id)} style={{width:"80px",backgroundColor:"green",height:'40px'}}> Delete</button></TableCell>
              <TableCell align = "right">
              <ModalEdit id = {row.id} firstName={row.firstName} lastName={row.lastName} email={row.email} adress={row.address} contact={row.contactNumber} landline={row.landline} />
                </TableCell>
            </TableRow>
          ))}
          <TableRow>
          </TableRow>

        </TableBody>
        
      </Table>
    </TableContainer>
    <TablePagination  
     rowsPerPageOptions={[5, 10, 15]}  
            component="div"  
            count={rows.length}  
            rowsPerPage={rowsPerPage}  
            page={page}  
            onChangePage={handleChangePage}  
            onChangeRowsPerPage={handleChangeRowsPerPage}  
          />  
          </Paper>
  );
}
