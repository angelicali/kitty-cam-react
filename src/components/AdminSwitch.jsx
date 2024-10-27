import { Switch, Typography } from "@mui/material";

export default function AdminSwitch({onToggle}) {
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Switch 
                defaultChecked={false}
                onChange={onToggle}
                size="small"
                /> 
            <Typography variant="body2">Admin</Typography>
        </div>
    )
}