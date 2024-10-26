export default function Video({videoUrl}) {
    return <video preload="metadata" width="320" height="240" controls>
        <source src={videoUrl} type="video/mp4" />
    </video>
}