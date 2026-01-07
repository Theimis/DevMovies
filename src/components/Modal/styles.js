import styled from "styled-components";


export const Background = styled.div`
 height: 100%;
 width: 100%;
 z-index: 1002;
 background: rgba(0, 0, 0, 0.7);
 position: absolute;
 top: 0;
 left: 0;
 display: flex;
 align-items: center;
 justify-content: center;
`


export const Container = styled.div`
 background: #000;
 width: 70%;
 display: flex;
 justify-content: center;
 align-items: center;
 position: relative;
 padding: 50px;
 max-width: 1200px;
 max-height: 100%;
 box-sizing: border-box;

 iframe {
    border: none;
 }
    
`;

export const CloseButton = styled.button`
   position: absolute;
   top: 8px;
   right: 0px;
   width: 50px;
   height: 40px;
   border-radius: 0;
   border: none;
   background: transparent;
   color: #ffffff;
   font-size: 60px;
   line-height: 1;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   z-index: 1003;
   transition: color 0.12s ease;

   &:hover {
     color: #dddddd;
   }
`;

