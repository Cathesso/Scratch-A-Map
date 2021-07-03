import styled from "styled-components/macro";

export default function Computer() {
  return (
    <Wrapper>
      <div className="screen">
        <div className="cursor" />
        <div className="eyes" />
        <div className="mouth" />
      </div>
      <div className="case" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  --size: 25vmin;
  width: var(--size);
  height: var(--size);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcf1f1;
  background: #7c9473;
  border-radius: 50%;
  .screen {
    bottom: 30%;
    width: 70%;
    height: 52.5%;
    background: #7c9473;
    color: #cdd0cb;
    border-style: solid;
    border-width: calc(var(--size) * 0.05);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2%;
  }

  .cursor {
    top: 2%;
    left: 2%;
    height: 8%;
    width: 1%;
    background: #e8eae6;
    position: absolute;
    animation: blink 1s infinite alternate;
  }

  @keyframes blink {
    from {
      visibility: hidden;
      opacity: 0;
    }
    to {
      visibility: visible;
      opacity: 1;
    }
  }

  .eyes {
    width: calc(var(--size) * 0.04);
    height: calc(var(--size) * 0.08);
    background: #e8eae6;
    position: absolute;
    top: 30%;
    left: 33%;
    box-shadow: calc(var(--size) * 0.2) 0 #e8eae6;
  }

  .mouth {
    color: #e8eae6;
    top: 45%;
    position: absolute;
    height: calc(var(--size) * 0.04);
    width: calc(var(--size) * 0.07);
    border-style: solid;
    border-width: calc(var(--size) * 0.04);
    clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  }
  .case {
    width: 85%;
    height: 20%;
    background: #cdd0cb;
    position: absolute;
    bottom: 5%;
    border-radius: 2%;
  }
  .case::after {
    content: "";
    top: 50%;
    height: 10%;
    width: 40%;
    right: 5%;
    background: #e8eae6;
    position: absolute;
  }
  .case::before {
    content: "";
    top: 45%;
    height: 20%;
    width: 15%;
    right: 17.5%;
    background: #e8eae6;
    position: absolute;
  }
`;