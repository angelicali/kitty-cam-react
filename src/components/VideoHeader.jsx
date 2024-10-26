import { IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function VideoHeader({ timestamp, videoId, adminMode, onDelete }) {
    return (
        <div className="video-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography margin='0.2em'>{timestamp}</Typography>
            {adminMode && <IconButton
                aria-label="delete"
                size="small"
                onClick={() => onDelete(videoId)}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>}
        </div>
    )
}