import { useEffect, useState } from "react";
import { Container, Background, CloseButton } from "./styles";
import { getMovieVideos, getTvVideos } from "../../services/getData";



function Modal({ movieId, setShowModal, mediaType = 'movie' }) {
    const [video, setVideo] = useState(null);

    useEffect(() => {
        async function fetchVideos() {
            let videos = null;
            try {
                if (mediaType === 'tv') {
                    videos = await getTvVideos(movieId);
                } else {
                    videos = await getMovieVideos(movieId);
                }
            } catch (err) {
                videos = null;
            }

            if (!videos || videos.length === 0) {
                setVideo(null);
                return;
            }

            const ytTrailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer');
            const ytAny = videos.find(v => v.site === 'YouTube');
            const selected = ytTrailer || ytAny || videos[0];

            setVideo(selected || null);
        }
        if (movieId) fetchVideos();
    }, [movieId, mediaType]);

    const handleClose = () => {
        if (typeof setShowModal === 'function') setShowModal(false);
    };

    return (
        <Background onClick={handleClose}>
            {video && (
                <Container onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={handleClose} aria-label="Fechar modal">×</CloseButton>
                    <iframe
                        src={`https://www.youtube.com/embed/${video.key || video.Key || ''}`}
                        title="Youtube video Player"
                        height="500px"
                        width="100%"
                    />
                </Container>
            )}
        </Background>
    );
}

export default Modal;