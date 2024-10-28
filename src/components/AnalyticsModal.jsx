import { useState } from "react";
import Modal from '@mui/material/Modal';
// import Tabs from '@mui/material/Tabs';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import AnalyticsLocationTab from "./AnalyticsLocationTab";
import AnalyticsActiveHourTab from './AnalyticsActiveHourTab';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: 700,
    height: 600,
    display: 'flex',
    flexDirection: 'column'

};

export default function AnalyticsModal({ open, handleClose, backendUrl }) {
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        console.log(event);
        setTabValue(newValue);
    };

    return <Modal open={open} onClose={handleClose}>
        <div style={boxStyle}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Frame Location" />
                <Tab label="Active Hour" />
            </Tabs>
            <div style={{ flexGrow: 1}}>
                {tabValue === 0 && <AnalyticsLocationTab backendUrl={backendUrl}/>}
                {tabValue === 1 && <AnalyticsActiveHourTab backendUrl={backendUrl}/>}
            </div>
        </div>

    </Modal>
}