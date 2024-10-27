import Video from './Video';
import { Button } from '@mui/material';
import VideoHeader from './VideoHeader';
import { useState } from 'react';

export default function VideoGallery({ data, backendUrl, adminMode }) {
    const [numVideos, setNumVideos] = useState(6);
    const [videos, setVideos] = useState(data);

    const handleDelete = async (videoId) => {
        try {
            const response = await fetch(`${backendUrl}video/${videoId}.mp4`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setVideos(videos.filter(([_, id]) => id !== videoId));
                // TODO: add snackbar for video deletion success
            } else {
                alert('Failed to delete video');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2em' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {videos.slice(0, numVideos).map(([timestamp, videoId]) => {
                    return (
                        <div key={videoId + '-container'} style={{ margin: '.5em' }}>
                            <VideoHeader 
                                key={videoId + '-header'} 
                                timestamp={timestamp} 
                                adminMode={adminMode} 
                                videoId={videoId} 
                                onDelete={handleDelete}
                                backendUrl={backendUrl} />
                            <Video key={videoId} videoUrl={backendUrl + 'video/' + videoId + '.mp4'} />
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

    </>
};