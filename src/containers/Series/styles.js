import styled from 'styled-components';

export const Container = styled.div`
  background: #000000;
  min-height: 100vh;
  padding-top: 0;
  padding-bottom: 40px;
`;

export const Title = styled.h1`
  color: #ffffff;
  margin-left: 20px;
  font-size: 28px;
`;

export const Background = styled.div`
  background-image: url(${props => props.$img});
  height: 100vh;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1;
  }
`;

export const HeroContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 1500px;
  position: relative;
  z-index: 2;
`;

export const Info = styled.div`
  z-index: 2;
  padding: 20px;
  width: 50%;

  h1 {
    font-size: 5rem;
    font-weight: 700;
    color: #ffffff;
  }

  p{
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    margin-top: 30px;
    margin-bottom: 20px;
  }
`;

export const Poster = styled.div`
  z-index: 2;
  
  img {
    width: 400px;
    border-radius: 15px;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;
