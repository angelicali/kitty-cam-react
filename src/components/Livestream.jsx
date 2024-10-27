
export default function Livestream({ livestreamUrl }) {
    return (
        <div id="livestreamContainer">
            <img id="livestream" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} src={livestreamUrl} />
        </div>
    )
}