
export default function Livestream({ livestreamUrl }) {
    return (
        <div id="livestreamContainer">
            <img id="livestream" style={{ maxWidth: '800px', height: 'auto', objectFit: 'contain' }} src={livestreamUrl} />
        </div>
    )
}