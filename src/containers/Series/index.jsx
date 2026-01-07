import { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import { getTopSeries } from '../../services/getData';
import { Container, Title, Background, HeroContainer, Info, Poster, ContainerButtons } from './styles';
import Button from '../../components/Button';
import { getImages } from '../../utils/getImages';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';

function Series() {
    const [topSeries, setTopSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const series = await getTopSeries();
                if (mounted) setTopSeries(series);
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

    const hero = topSeries && topSeries.length > 0 ? topSeries[0] : null;

    return (
        <Container>
            {loading && <p style={{ color: '#fff', marginLeft: 20 }}>Carregando...</p>}

            {!loading && hero && (
                <>
                    <Background $img={getImages(hero.backdrop_path)}>
                        {showModal && <Modal movieId={hero.id} setShowModal={setShowModal} mediaType={'tv'} />}
                        <HeroContainer>
                            <Info>
                                <h1>{hero.name}</h1>
                                <p>{hero.overview}</p>
                                <ContainerButtons>
                                    <Button red onClick={() => navigate(`/detalhe/tv/${hero.id}`)}>Assistir Agora</Button>
                                    <Button onClick={() => setShowModal(true)}>Assistir ao Trailer</Button>
                                </ContainerButtons>
                            </Info>

                            <Poster>
                                <img alt={hero.name} src={getImages(hero.poster_path)} />
                            </Poster>
                        </HeroContainer>
                    </Background>
                </>
            )}

            {!loading && topSeries && topSeries.length > 0 && (
                <Slider info={topSeries} title={'Top Séries'} />
            )}

            {!loading && topSeries && topSeries.length === 0 && (
                <p style={{ color: '#fff', marginLeft: 20 }}>Nenhuma série encontrada.</p>
            )}
        </Container>
    );
}

export default Series;