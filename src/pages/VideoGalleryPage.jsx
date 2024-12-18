import { Container } from "@mui/material";
import { useState } from "react";
import VideoGallery from "../components/VideoGallery";
import AdminSwitch from "../components/AdminSwitch";
import Loading from "../components/Loading";
import AnalyticsModal from "../components/AnalyticsModal";
import { useQuery } from '@tanstack/react-query';
import AnalyticsButton from "../components/AnalyticsButton";

export default function VideoGalleryPage({ backendUrl }) {
    const [adminMode, setAdminMode] = useState(false);
    const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);

    const onAdminToggle = (event) => {
        setAdminMode(event.target.checked);
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['videoMetadata'],
        queryFn: () => fetch(`${backendUrl}past-visits`, {
            headers: new Headers({
                "ngrok-skip-browser-warning": "1234",
            })
        },).then((res) => res.json(),),
        staleTime: 1000 * 60 , // 1 minute
        cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    if (isPending) return <Loading />;

    if (error) return 'An error has occurred: ' + error.message;


    return (
        <Container>
            <VideoGallery data={data} backendUrl={backendUrl} adminMode={adminMode} />
            <AdminSwitch onToggle={onAdminToggle} />
            {adminMode && <AnalyticsButton onClick={() => setAnalyticsModalOpen(true)} />}
            <AnalyticsModal open={analyticsModalOpen} handleClose={() => setAnalyticsModalOpen(false)} backendUrl={backendUrl} />
        </Container>
    )
}