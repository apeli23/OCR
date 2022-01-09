import styled from '@emotion/styled';

export const Container = styled.div`
  margin-left: 5%;
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  font-family: 'Josefin Sans', sans-serif;
`;

export const Title = styled.li`
  display: flex;
  justify-content: center;
  margin: 0%;
  padding: 0;
  list-style: none;
  margin-right: 20px;
  font-size: 21px;
  font-weight: 300;
  cursor: pointer;
  &: hover;
`;

export const VideoContainer = styled.div`
text-align:center;`

export const Button = styled.div`
    color: black;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    line-height: 45px;
    max-width: 100%;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    width: 100%;
    // border: 1px solid;
    overflow: hidden;
    position: relative;
    &:after {
        background: red;
        content: "";
        height: 155px;
        left: -75px;
        opacity: 0.2;
        position: absolute;
        top: -50px;
        transform: rotate(35deg);
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        width: 50px;
        z-index: -10;
    }
    &:hover {
      transform: scale(1.5);
        text-decoration: none;
        :after {
            left: 120%;
            transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        }
    }
`;

export const Video = styled.video`
  width: 40vw;
  height: 30vw;
  margin: 1rem;
  background: #2c3e50;
`