import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { ThemeContext } from '@emotion/react';
import Button from '@mui/material/Button'
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import AddTool from './addTool';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import toolsApi from '../services/toolsApi';
export default function ToolManagement() {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([])
    const [tools, setTools] = React.useState([])
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const handleClickOpen = (params) => {
        console.log(params.cellValues)
        setOpen(true);
    };
    const handleClose = () => {
        console.log("close")
        setOpen(false);
    };
    const handleRestart=async (event,cellValues)=>{
        console.log(cellValues)
        await toolsApi.restartTool({tool_enum:cellValues.row.enum})
        console.log("")
    }

    const columns = [{ field: "id", headerName: "Id", width: 70 },
    { field: "name", headerName: "name", width: 130 },
    { field: "endpoint", headerName: "Endpoint", width: 130 },
    { field: "enum", headerName: "enum", width: 130 },
    {
        field: "Edit",
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleClickOpen(event, cellValues);
              }}
            >
              Edit
            </Button>
          );
        }
      },
      {
        field: "Restart",
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleRestart(event, cellValues);
              }}
            >
              Restart
            </Button>
          );
        }
      },
    ]

    let row = []
    const getTools = async () => {
        let tool = await toolsApi.getTools()
        console.log(tool)
        row = tool.map((key, index) => {
            return { id: index, name: key.name, description: key.description, endpoint: key.endpoint, enum: key.enum }
        })
        console.log(row)
        setRows(row)
        setTools(tool)
    };
    React.useEffect(() => {
        getTools()
    }, []);
    return <>
        {rows.length == 0 ? <div>wait</div> :
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[5]}

                />
            </div>}

        <div>

            <Dialog
            
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       <AddTool></AddTool>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Save
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                       Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        
    </>

}
