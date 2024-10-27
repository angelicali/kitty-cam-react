import {useState} from "react";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import VideoLogCard from "./VideoLogCard";

export default function VideoHeader({ timestamp, videoId, adminMode, onDelete, backendUrl }) {
    const [anchor, setAnchor] = useState(false);

    const handleInfoClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    return (
        <>
            <div className="video-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography margin='0.2em' style={{ flexGrow: 1 }}>{timestamp}</Typography>
                {adminMode && (<>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => onDelete(videoId)}
                        color="warning">
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        aria-label="info"
                        size="small"
                        onClick={handleInfoClick}>
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </>
                )}
            </div>
            <Popper id={videoId + '-info'} open={Boolean(anchor)} anchorEl={anchor} placement="right-start">
                  <VideoLogCard backendUrl={backendUrl} videoId={videoId}/>
            </Popper>
        </>
    )
}