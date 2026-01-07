import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Background, Info, Poster, Conatiner, ContainerButtons } from './styles';

import { useState } from 'react';
import Button from '../../components/Button';
import Slider from '../../components/Slider';
import { getImages } from '../../utils/getImages';
import Modal from '../../components/Modal';
import { getMovies, getPopularSeries, getTopMovies, getTopPeople, getTopSeries } from '../../services/getData';

function Home() {
    const [showModal, setShowModal] = useState(false);

    const [movie, setMovie] = useState();
    const [TopMovies, setTopMovies] = useState();
    const [TopSeries, setTopSeries] = useState();
    const [PopularSeries, setPopularSeries] = useState();
    const [TopPeople, setTopPeople] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllData() {
            Promise.all([
                getMovies(),
                getTopMovies(),
                getTopSeries(),
                getPopularSeries(),
                getTopPeople()
            ])
                .then(([movie, topMovies, topSeries, popularSeries, topPeople]) => {
                    setMovie(movie);
                    setTopMovies(topMovies);
                    setTopSeries(topSeries);
                    setPopularSeries(popularSeries);
                    setTopPeople(topPeople);
                })
                .catch((error) => console.error(error));

        }
        getAllData();
    }, [])



    return (
        <>
            {movie && (
                <Background $img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal} />}
                    <Conatiner>
                        <Info>
                            <h1>{movie.title} </h1>
                            <p>{movie.overview} </p>
                            <ContainerButtons>
                                <Button red onClick={() => navigate(`/detalhe/${movie.id}`)}>Assistar Agora</Button>
                                <Button onClick={() => setShowModal(true)}>Assistar ao Trailer</Button>
                            </ContainerButtons>
                        </Info>



                        <Poster>
                            <img alt="capa-do-filme" src={getImages(movie.poster_path)} />
                        </Poster>
                    </Conatiner>
                </Background>
            )}
            {TopMovies && <Slider info={TopMovies} title={'Top Filmes'} />}
            {TopSeries && <Slider info={TopSeries} title={'Top Series'} />}
            {PopularSeries && <Slider info={PopularSeries} title={'SeriesPopulares'} />}
            {TopPeople && <Slider info={TopPeople} title={'Top Artistas'} />}
        </>
    );
}

export default Home;   