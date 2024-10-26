import { Container } from "@mui/material";
import { useState } from "react";
import VideoGallery from "../components/VideoGallery";
import AdminSwitch from "../components/AdminSwitch";
import Loading from "../components/Loading";
import { useQuery } from '@tanstack/react-query';

export default function VideoGalleryPage({backendUrl}) {
    const [adminMode, setAdminMode] = useState(false);

    const onAdminToggle = (event) => {
        setAdminMode(event.target.checked);
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['videoMetadata'],
        queryFn: () => fetch(`${backendUrl}past-visits`).then((res) => res.json(),),
    })

    if (isPending) return <Loading />;

    if (error) return 'An error has occurred: ' + error.message;


    return (
        <Container>
            <VideoGallery data={data} backendUrl={backendUrl} adminMode={adminMode} />
            <AdminSwitch onToggle={onAdminToggle}/>
        </Container>
    )
}