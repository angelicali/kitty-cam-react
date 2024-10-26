import Video from './Video';
import { Container } from "@mui/material";
import Stack from '@mui/material/Stack';
import VideoAdminTools from './VideoAdminTools';

export default function VideoGallery({ backendUrl, adminMode }) {
    const videos = [
        { filename: '20241025102841.mp4' },
        { filename: '20241025074128.mp4' },
    ];
    return <>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={3}>
                {videos.map((video) => {
                    return (
                        <>
                            <Video key={video.filename} videoUrl={backendUrl + 'video/' + video.filename}></Video>
                            {adminMode && <VideoAdminTools key={video.filename + 'admin'} videoFilename={video.filename}/>}
                        </>)
                }
                )}
                <p>End of stack</p>
            </Stack>
        </Container>
    </>
};