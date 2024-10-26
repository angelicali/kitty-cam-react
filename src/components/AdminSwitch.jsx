import { Switch, Typography } from "@mui/material";

export default function AdminSwitch({onToggle}) {
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
        }}>
            <Switch 
                defaultChecked={false}
                onChange={onToggle}
                // edge='end'
                /> 
            <Typography variant="body2" display="inline">Admin</Typography>
        </div>
    )
}