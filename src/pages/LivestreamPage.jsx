import Livestream from "../components/Livestream";
import { Container, Button } from "@mui/material";
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';

export default function LivestreamPage({ backendUrl }) {
    const openPip = async () => {
        const livestreamPlayer = document.querySelector('#livestream');
        livestreamPlayer.width = 320;
        livestreamPlayer.height = 240;

        const pipWindow = await documentPictureInPicture.requestWindow();
        pipWindow.document.body.append(livestreamPlayer);
        pipWindow.addEventListener("pagehide", (event)=>{
            const livestreamContainer = document.querySelector('#livestreamContainer');
            const livestreamPlayer = event.target.querySelector('#livestream');
            livestreamPlayer.width = 640;
            livestreamPlayer.height = 480;
            livestreamContainer.append(livestreamPlayer);
        })
    }

    return <>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80%%' }}>
            <Livestream livestreamUrl={backendUrl + 'video_feed'} />
            <Button
                onClick={openPip}
                sx={{ marginTop: '1em' }}
                variant="contained"
                color="secondary"
                startIcon={<PictureInPictureAltIcon />}
            >
                View in floating window
            </Button>
        </Container>

    </>

}