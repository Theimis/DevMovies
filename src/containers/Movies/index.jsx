
import { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import { getTopMovies } from '../../services/getData';
import { Container, Title, Background, HeroContainer, Info, Poster, ContainerButtons } from './styles';
import Button from '../../components/Button';
import { getImages } from '../../utils/getImages';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';

function Movies() {
    const [topMovies, setTopMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const movies = await getTopMovies();
                if (mounted) setTopMovies(movies);
            } catch (error) {
                console.error(error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();

        return () => { mounted = false };
    }, []);

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const hero = topMovies && topMovies.length > 0 ? topMovies[0] : null;

    return (
        <Container>
            {loading && <p style={{ color: '#fff', marginLeft: 20 }}>Carregando...</p>}

            {!loading && hero && (
                <>
                    <Background $img={getImages(hero.backdrop_path)}>
                        {showModal && <Modal movieId={hero.id} setShowModal={setShowModal} />}
                        <HeroContainer>
                            <Info>
                                <h1>{hero.title}</h1>
                                <p>{hero.overview}</p>
                                <ContainerButtons>
                                    <Button red onClick={() => navigate(`/detalhe/${hero.id}`)}>Assistir Agora</Button>
                                    <Button onClick={() => setShowModal(true)}>Assistir ao Trailer</Button>
                                </ContainerButtons>
                            </Info>

                            <Poster>
                                <img alt={hero.title} src={getImages(hero.poster_path)} />
                            </Poster>
                        </HeroContainer>
                    </Background>
                </>
            )}

            {!loading && topMovies && topMovies.length > 0 && (
                <Slider info={topMovies} title={'Top Filmes'} />
            )}

            {!loading && topMovies && topMovies.length === 0 && (
                <p style={{ color: '#fff', marginLeft: 20 }}>Nenhum filme encontrado.</p>
            )}
        </Container>
    );
}

export default Movies;