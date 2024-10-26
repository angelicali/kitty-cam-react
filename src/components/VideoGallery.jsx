import Video from './Video';
import { Button } from '@mui/material';
import VideoHeader from './VideoHeader';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Loading from './Loading';

export default function VideoGallery({ backendUrl, adminMode }) {
    const [numVideos, setNumVideos] = useState(6);

    const { isPending, error, data } = useQuery({
        queryKey: ['videoMetadata'],
        queryFn: () => fetch(`${backendUrl}past-visits`).then((res) => res.json(),),
    })

    if (isPending) return <Loading />;

    if (error) return 'An error has occurred: ' + error.message;


    return <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2em' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {data.slice(0, numVideos).map(([timestamp, videoId]) => {
                    return (
                        <div style={{margin: '.5em'}}>
                            <VideoHeader key={videoId + '-header'} timestamp={timestamp} adminMode={adminMode} videoId={videoId} />
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