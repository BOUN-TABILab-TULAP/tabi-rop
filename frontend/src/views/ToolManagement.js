import * as React from 'react';
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid';
import AddTool from './addTool';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import toolsApi from '../services/toolsApi';
import {useTranslation} from "react-i18next"
export default function ToolManagement() {
  const {t}=useTranslation()
    const [open, setOpen] = React.useState(false);
    const [chosen, setChosen] = React.useState({});
    const [rows, setRows] = React.useState([])
    const [tools, setTools] = React.useState([])
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = (params) => {
        setChosen(params.cellValues)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleRestart=async (event,cellValues)=>{
        const result= await toolsApi.restartTool({tool_enum:cellValues.row.enum})
        if(result.success){
          window.alert(t("restart.success"))
        }
        else{
          window.alert(t("restart.failure"))
        }
    }
    const columns = [{ field: "id", headerName: "Id", width: 70 },
    { field: "name", headerName:  t("name"), width: 130 },
    { field: "endpoint", headerName: t("endpoint"), width: 130 },
    { field: "enum", headerName: t("enum"), width: 130 },
    {
        field: t("edit"),
        width: 100 ,
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              sx={{textTransform:'none !important'}}
              onClick={(event) => {
                handleClickOpen(event, cellValues);
              }}
            >
              {t("edit")}
            </Button>
          );
        }
      },
      {
        field: t("restart"),
        width: 150 ,
        renderCell: (cellValues) => {
          return (
           <Button
              variant="contained"
              
              sx={{textTransform:'none !important'}}
              onClick={(event) => {
                handleRestart(event, cellValues);
              }}
            >
             {t("restart")}
            </Button>
          );
        }
      },
    ]

    let row = []
    const getTools = async () => {
        // let tool = await toolsApi.listEditableTools()
        let tool = await toolsApi.getTools()
       
        row = tool.map((key, index) => {
            return { id: index, name: key.name, description: key.description, endpoint: key.endpoint, enum: key.enum }
        })
      
        setRows(row)
        setTools(tool)
    };
    React.useEffect(() => {
        getTools()
    }, []);
    return <>
     {tools.length===0?<div>wait</div>:
            <div style={{ height: 400 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[5]}

                />
            </div>
            }
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
                       <AddTool chosen={chosen}></AddTool>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  sx={{textTransform:'none !important'}} onClick={handleClose} autoFocus>
                        {t("save")}
                    </Button>
                    <Button sx={{textTransform:'none !important'}} onClick={handleClose} autoFocus>
                      {t("exit")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        
    </>

}
