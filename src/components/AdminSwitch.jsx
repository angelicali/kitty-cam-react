import { Switch } from "@mui/material";

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
                /> Admin
        </div>
    )
}