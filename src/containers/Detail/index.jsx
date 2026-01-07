import { useEffect, useState } from "react";
import { Container, Background, Cover, Info, ContaierMovies } from "./styles";
import { getMovieById, getMovieCredits, getMovieSimilar, getMovieVideos, getTvById, getTvCredits, getTvSimilar, getTvVideos } from "../../services/getData";

import { useParams } from 'react-router-dom';
import { getImages } from "../../utils/getImages";
import SpanGenres from "../../components/SpanGenres";
import Slider from "../../components/Slider";
import Credtis from "../../components/Credtis";

function Detail() {

    const { mediaType, id } = useParams();
    const [item, setItem] = useState();
    const [itemVideos, setItemVideos] = useState();
    const [itemCredits, setItemCredits] = useState();
    const [itemSimilar, setItemSimilar] = useState();

    useEffect(() => {
        async function getAllData() {
            try {
                if (mediaType === 'tv') {
                    const [tv, videos, credits, similar] = await Promise.all([
                        getTvById(id),
                        getTvVideos(id),
                        getTvCredits(id),
                        getTvSimilar(id),
                    ]);

                    setItem(tv);
                    setItemVideos(videos);
                    setItemCredits(credits);
                    setItemSimilar(similar);
                } else {
                    const [movie, videos, credits, similar] = await Promise.all([
                        getMovieById(id),
                        getMovieVideos(id),
                        getMovieCredits(id),
                        getMovieSimilar(id),
                    ]);

                    setItem(movie);
                    setItemVideos(videos);
                    setItemCredits(credits);
                    setItemSimilar(similar);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getAllData();
    }, [id, mediaType])




    return (
        <>
            {item && (
                <>
                    <Background image={getImages(item.backdrop_path)} />
                    <Container>
                        <Cover>
                            <img src={getImages(item.poster_path)} />
                        </Cover>
                        <Info>
                            <h2>{item.title || item.name}</h2>
                            <SpanGenres genres={item.genres} />
                            <p>{item.overview}</p>
                            <div>
                                <Credtis credtis={itemCredits} />
                            </div>
                        </Info>
                    </Container>
                    <ContaierMovies>
                        {itemVideos && itemVideos.map(video => (
                            <div key={video.id}>
                                <h4>{video.name}</h4>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title="Youtube video Player"
                                    height="500px"
                                    width="100%"
                                />
                            </div>
                        ))}

                    </ContaierMovies>

                    {itemSimilar && <Slider info={itemSimilar} title={mediaType === 'tv' ? 'Séries Similares' : 'Filmes Similares'} />}

                </>
            )}
        </>
    );
}

export default Detail;