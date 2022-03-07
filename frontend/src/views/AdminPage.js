import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';
import toolsApi from "../services/toolsApi"
import ToolManagement from "./ToolManagement"
import ToolMan from './ToolMan';
import UserManagement from './UserManagement';
const useStyles = makeStyles({
});
export default function AdminPage({ tool }) {
    const classes = useStyles();
    const [value, set_value] = React.useState('1');
    const handleChange = (event, newValue) => {
        set_value(newValue);
    };

    return <>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Manage Tools" value="1" />
                        <Tab label="Manage Users" value="2" />
                        <Tab label="Extra" value="3" />
                    </TabList>
                </Box>
                <TabPanel className={classes.Tabs} value="1">
                    <ToolManagement/>
                </TabPanel>
                <TabPanel className={classes.Tabs} value="2">
                    <UserManagement/>
                </TabPanel>
                <TabPanel className={classes.Tabs} value="3">Item Three</TabPanel>
            </TabContext>
    </>

}
