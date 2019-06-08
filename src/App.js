import React from "react";
import styled from "styled-components";
import titles from "./titles.json";
import { ExpandMore, ExpandLess, Shuffle } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const colors = {
  white: "rgba(250, 250, 250, 1.0)",
  gray: "rgba(0, 0, 0, 0.75)"
};

const StyledUnorderedList = styled.ol`
  padding: 0;
  margin-top: 1.8rem;
`;

const StyledListItem = styled.li`
  width: 90vw;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  background: ${colors.white};

  padding: 0.8rem 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;

  :last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.div`
  padding: 0 0.8rem;
`;

const StyledIFrame = styled.iframe`
  height: 70vh;
  margin-top: 0.8rem;
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  padding: 0.9rem;
  box-sizing: border-box;
  padding-left: 1.1rem;
  background: ${colors.white};

  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  white-space: nowrap;
`;
const TitleSub = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  padding-left: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray};

  display: block;
  @media screen and (max-width: 360px) {
    display: none;
  }
`;

const ShuffleButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ListItem({ title, idx }) {
  const [expanded, set_expanded] = React.useState(false);
  return (
    <StyledListItem onClick={e => set_expanded(prev => !prev)}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon>{expanded ? <ExpandMore /> : <ExpandLess />}</Icon>
        {title}
      </div>
      {expanded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "0.8rem"
          }}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://ja.wikipedia.org/wiki/${title}`}
            style={{ paddingLeft: "0.8rem", width: "fit-content" }}
          >
            新しいタブで開く
          </a>
          <StyledIFrame
            title={`manga_${idx}`}
            src={`https://ja.wikipedia.org/wiki/${title}`}
          />
        </div>
      )}
    </StyledListItem>
  );
}

function App() {
  shuffle(titles);
  return (
    <Wrapper>
      <Header>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <Title>Wikipedia漫画</Title>
          <TitleSub>ランダムにWikipediaの漫画を表示</TitleSub>
        </div>
        <ShuffleButton variant="outlined" color="primary">
          <Shuffle />
          シャッフル
        </ShuffleButton>
      </Header>
      <StyledUnorderedList>
        {titles.map((title, idx) => (
          <ListItem title={title} idx={idx} key={idx} />
        ))}
      </StyledUnorderedList>
    </Wrapper>
  );
}

export default App;
