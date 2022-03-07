import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import toolsApi from '../services/toolsApi';
import Button from "@mui/material/Button"
import IconButton from '@mui/material/IconButton';
const columns = [{ id: "id", label: "Id", width: 70 },
    { id: "name", label: "name", width: 130 },
    { id: "endpoint", label: "Endpoint", width: 130 },
    { id: "enum", label: "enum", width: 130 },
    {
        id: 'edit',
        label: 'Edit',
        
    },
    {
        id: 'restart',
        label: 'Restart',
       
       
    }
    ]
    const EditButton=({toolEnum})=>
    {
       return <Button onClick={console.log("dfdsf")}>Editsd</Button>
    }
export default function ToolMan() {
    const [rows, setRows] = React.useState([])
   
    let row = []
    const getTools = async () => {
        let tool = await toolsApi.getTools()
        console.log(tool)
        row = tool.map((key, index) => {
            return { id: index, name: key.name, description: key.description, endpoint: key.endpoint, enum: key.enum,edit:<EditButton></EditButton>,restart:<EditButton></EditButton> }
        })
        console.log(row)
        setRows(row)
        
    };
    React.useEffect(() => {
        getTools()
    }, []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
                return (
                  <TableRow hover  tabIndex={-1} key={row.code}>
                    
                    {columns.map((column) => {
                      
                      console.log(column)
                      console.log(row)
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      );
                    })}
                    <EditButton></EditButton>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}
