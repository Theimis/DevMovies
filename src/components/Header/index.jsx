import { Container, Menu, Li, } from "./styles";

import Logo from "../../assets/logo.png";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {

    const [changeBackground, setChangeBackground] = useState(false);

    const { pathname } = useLocation();
    const isMovies = pathname.includes('filmes');

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset > 0;
            setChangeBackground(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Container $changeBackground={changeBackground} $isMovies={isMovies}>
            <img src={Logo} alt="Logo-Dev-Movies" />
            <Menu>
                <Li $isActive={pathname === "/"}>
                    <Link to="/">Home</Link>
                </Li>
                <Li $isActive={pathname.includes('filmes')}>
                    <Link to="/filmes">Filmes</Link>
                </Li>
                <Li $isActive={pathname.includes('series')}>
                    <Link to="/series">Séries</Link>
                </Li>
            </Menu>
        </Container>
    );
}


export default Header; 