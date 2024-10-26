import { Button, CircularProgress } from '@mui/material';

export default function Loading(){
    return <div style={{display:'flex', justifyContent:'center', alignItems:'center', height: '80%', width: '100%'}}>
        <CircularProgress />
    </div>
}