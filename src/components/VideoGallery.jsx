import Video from './Video';
import { Button } from '@mui/material';
import VideoHeader from './VideoHeader';
import { useState } from 'react';
import { Snackbar } from '@mui/material';

function videoIdToTimestr(videoId) {
    const year = videoId.slice(0, 4);
    const month = videoId.slice(4, 6);
    const day = videoId.slice(6, 8);
    const hour = videoId.slice(8, 10);
    const minute = videoId.slice(10, 12);
  
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

export default function VideoGallery({ videoList, heartList, backendUrl, adminMode }) {
    const [numVideos, setNumVideos] = useState(6);
    const [videos, setVideos] = useState(videoList);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const heartSet = new Set(heartList);
    console.log(heartSet);

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
                setVideos(videos.filter((id) => id !== videoId));
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

    const updateFavorite = async (videoId, favoriteBool) => {
        try {
            if (favoriteBool) {
                const response = await fetch(`${backendUrl}favorite/${videoId}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    setSnackbarMessage("Added video to favorites");
                    setSnackbarOpen(true);
                } else if (response.status === 403) {
                    setSnackbarMessage("Error: You're not authorized for marking/unmarking favorites.");
                    setSnackbarOpen(true);
                } else {
                    setSnackbarMessage("Failed to heart video.");
                    setSnackbarOpen(true);
                }
            } else {
                const response = await fetch(`${backendUrl}favorite/${videoId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setSnackbarMessage("Removed video from favorites");
                    setSnackbarOpen(true);
                } else if (response.status === 403) {
                    setSnackbarMessage("Error: You're not authorized for marking/unmarking favorites.");
                    setSnackbarOpen(true);
                } else {
                    setSnackbarMessage("Failed to un-heart video.");
                    setSnackbarOpen(true);
                }
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
                                timestamp={videoIdToTimestr(videoId)} 
                                adminMode={adminMode} 
                                videoId={videoId} 
                                onDelete={handleDelete}
                                isHearted={heartSet.has(videoId)}
                                updateFavorite={updateFavorite}
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
