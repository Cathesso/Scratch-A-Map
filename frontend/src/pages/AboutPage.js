import styled from "styled-components/macro";

export default function AboutPage() {
  return (
    <Wrapper>
      <div className="centerpiece">
        <Info>
          <ul>
            <li>
              Map-Icons made by{" "}
              <a href="https://www.freepik.com" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </li>
            <li>Background: Photo by Peter Nguyen on Unsplash</li>
            <li>Side-Menu: https://codepen.io/shieldsma91/pen/zLpbLX</li>
          </ul>
        </Info>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
  display: grid;
  margin: 3%;
  grid-template-columns: 1fr auto 1fr;

  .MuiFormControl-root {
    margin: 10px 0;
  }

  .centerpiece {
    grid-column-start: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Info = styled.div`
  color: white;
  background: rgba(128, 128, 128, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px;
`;
