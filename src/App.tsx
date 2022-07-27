import React from "react";
import { useState } from "react";
import { Component } from "react";
import { ReactNode } from "react";
import { ReactElement } from "react";
import "./App.css";

// const HeadingFC: React.FC<{ title: string }> = ({ title }) => {
//   return <h5>{title}</h5>;
// };

// /-------- Conventional props --------/
function Heading({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function Main({ children }: { children: ReactNode }): ReactElement {
  return <h3>{children}</h3>;
}

// /-------- Defaultprops --------/
const ContainerProps = {
  heading: <h2>Ez a fejléc</h2>,
};

type Props = {
  children: ReactNode;
} & typeof ContainerProps;

function Container({ heading, children }: Props): ReactElement {
  return (
    <div>
      <span>{heading}</span>
      <h3>{children}</h3>
    </div>
  );
}

Container.defaultProps = ContainerProps;

// /-------- Functional props --------/
function TextWithNumber({
  header,
  children,
}: {
  header?: (num: number) => ReactNode;
  children: (num: number) => ReactNode;
}) {
  const [state, setState] = useState(0);

  return (
    <div>
      {header && <h1>{header?.(state)}</h1>}
      <div>{children(state)}</div>
      <div>
        <button
          onClick={() => {
            setState(state - 1);
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            setState(state + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

// /-------- List --------/
function List<ListItems>({
  items,
  render,
}: {
  items: ListItems[];
  render: (item: ListItems) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

// /-------- Class component --------/
class MyHeader extends Component<{ title: ReactNode }> {
  render() {
    return <h5>{this.props.title}</h5>;
  }
}

function App() {
  return (
    <div className="App">
      <Heading title="Szia Geri" />

      <Main>
        <strong>Ez a közepe</strong>
      </Main>

      <Container>fejléc és konténer</Container>

      <TextWithNumber
      // header={(num: number) => {
      //   return <span>A fejlén száma: {num}</span>;
      // }}
      >
        {(num: number) => {
          return (
            <div>A szám: {num < -5 ? "Hiba" : num > 10 ? "Max szám" : num}</div>
          );
        }}
      </TextWithNumber>

      <List
        items={["Geri", "Timi", "Éva"]}
        render={(item: string) => <div>{item.toUpperCase()}</div>}
      ></List>

      <MyHeader title="Ez is egy Fejléc megint" />
    </div>
  );
}

export default App;
