import Livestream from "../components/Livestream";
import { Container } from "@mui/material";

export default function LivestreamPage({ backendUrl }) {

    return <>
        <Container maxWidth="lg" sx={{display: 'flex', justifyContent:'center', height: '80%%'}}>
            <Livestream livestreamUrl={backendUrl + 'video_feed'} />
        </Container>

    </>

}