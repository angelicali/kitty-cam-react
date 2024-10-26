
export default function Livestream({livestreamUrl}) {
    return <img style={{maxWidth:'800px', height:'auto', objectFit: 'contain'}} src={livestreamUrl} />
}