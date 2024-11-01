import Video from './Video';
import { Button } from '@mui/material';
import VideoHeader from './VideoHeader';
import { useState } from 'react';
import { Snackbar } from '@mui/material';

export default function VideoGallery({ data, backendUrl, adminMode }) {
    const [numVideos, setNumVideos] = useState(6);
    const [videos, setVideos] = useState(data);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbarClose = (event, reason) => {
        console.log(`snackbar close reason: ${reason}`);
        setSnackbarOpen(false);
    }

    const handleDelete = async (videoId) => {
        try {
            const response = await fetch(`${backendUrl}video/${videoId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setVideos(videos.filter(([_, id]) => id !== videoId));
                setSnackbarMessage("Video deleted");
                setSnackbarOpen(true);
            } else if (response.status === 403) {
                setSnackbarMessage("Error: You're not authorized to delete videos.");
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage("Failed to delete video.");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2em' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {videos.slice(0, numVideos).map((videoId) => {
                    return (
                        <div key={videoId + '-container'} style={{ margin: '.5em' }}>
                            <VideoHeader 
                                key={videoId + '-header'} 
                                timestamp={timestamp} 
                                adminMode={adminMode} 
                                videoId={videoId} 
                                onDelete={handleDelete}
                                backendUrl={backendUrl} />
                            <Video key={videoId} videoUrl={backendUrl + 'video/' + videoId} />
                        </div>)
                }
                )}
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
            <Button variant="contained" color="secondary" onClick={() => {
                setNumVideos(numVideos => numVideos + 6);
            }}>Load more</Button>
        </div>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage}/>

    </>
};