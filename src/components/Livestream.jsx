import React, { useEffect, useState } from 'react';

export default function Livestream({ livestreamUrl }) {
    const [imgSrc, setImgSrc] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource(livestreamUrl);
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setIsRecording(data.is_recording);
            setImgSrc(`data:image/jpeg;base64,${data.frame}`);
        }

        eventSource.onerror = (error) => {
            console.error("Error receiving SSE stream:", error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [livestreamUrl]);

    return (
        <div id="livestreamContainer" style={{ position: 'relative', display: 'inline-block' }}>
            <img id="livestream"
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                src={imgSrc} />
            {isRecording && (
                <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 'bold'
                }}>
                    <div style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        marginRight: '5px'
                    }}></div>
                    Recording
                </div>
            )}
        </div>
    )
}