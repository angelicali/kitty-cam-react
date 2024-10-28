import { useState, useRef, useEffect } from "react";
import { Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { objectColors as colors } from '../utils/configs';
import Loading from "./Loading";

export default function AnalyticsLocationTab({ backendUrl }) {
    const { isPending, error, data } = useQuery({
        queryKey: ['boxLocations'],
        queryFn: () => fetch(`${backendUrl}locations/all`, {
            headers: new Headers({
                "ngrok-skip-browser-warning": "1234",
            })
        }).then((res) => res.json(),),
        staleTime: 1000 * 60 * 60, // 1 hour is fresh enough
        cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    })


    const canvasRef = useRef(null);
    const [visibility, setVisibility] = useState({
        cat: false,
        raccoon: false,
        possum: false,
        person: false
    });

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const handleResizeAndDraw = () => {
            const scaleX = canvas.width / 640;
            const scaleY = canvas.height / 480;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const drawLocations = (locations, color) => {
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                locations.forEach(({ box: { x1, x2, y1, y2 }, confidence: confidence }) => {
                    ctx.globalAlpha = confidence * 0.5;
                    ctx.strokeRect(x1 * scaleX, y1 * scaleY, (x2 - x1) * scaleX, (y2 - y1) * scaleY);
                })
            };

            if (visibility.possum) drawLocations(data.possum, colors.possum);
            if (visibility.cat) drawLocations(data.cat, colors.cat);
            if (visibility.raccoon) drawLocations(data.raccoon, colors.raccoon);
            if (visibility.person) drawLocations(data.person, colors.person);
        };

        handleResizeAndDraw();
        window.addEventListener('resize', handleResizeAndDraw);
        return () => window.removeEventListener('resize', handleResizeAndDraw);
    }, [visibility]);

    const handleCheckboxChange = (objectType) => {
        setVisibility(prev => ({ ...prev, [objectType]: !prev[objectType] }));
    };


    if (isPending) return <Loading />

    if (error) return 'An error has occurred: ' + error.message;


    return (
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <div className="panelHeader" style={{ width: '80%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '0.5em', height: '6%' }}>
                <span>
                    <input type="checkbox" checked={visibility.cat} onChange={() => handleCheckboxChange('cat')} style={{ accentColor: colors.cat }} />
                    <Typography display="inline">Cat</Typography>
                </span>
                <span>
                    <input type="checkbox" checked={visibility.raccoon} onChange={() => handleCheckboxChange('raccoon')} style={{ accentColor: colors.raccoon }} />
                    <Typography display="inline">Raccoon</Typography>
                </span>
                <span>
                    <input type="checkbox" checked={visibility.possum} onChange={() => handleCheckboxChange('possum')} style={{ accentColor: colors.possum }} />
                    <Typography display="inline">Possum</Typography>
                </span>
                <span>
                    <input type="checkbox" checked={visibility.person} onChange={() => handleCheckboxChange('person')} style={{ accentColor: colors.person }} />
                    <Typography display="inline">Human</Typography>
                </span>
            </div>
            <div style={{
                width: '100%', maxWidth: 640, height: '75vw', maxHeight: 480,
                border: '1px solid black', backgroundColor: 'white'
            }}>
                <canvas ref={canvasRef} width={640} height={480} style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    )

}