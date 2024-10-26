import { Container } from "@mui/material";
import { useState } from "react";
import VideoGallery from "../components/VideoGallery";
import AdminSwitch from "../components/AdminSwitch";

export default function VideoGalleryPage({backendUrl}) {
    const [adminMode, setAdminMode] = useState(false);

    const onAdminToggle = (event) => {
        setAdminMode(event.target.checked);
    }

    return (
        <Container>
            <VideoGallery backendUrl={backendUrl} adminMode={adminMode} />
            <AdminSwitch onToggle={onAdminToggle}/>
        </Container>
    )
}