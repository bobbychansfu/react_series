import "./App.css";

import { Main, Header, Footer } from "./components";

function App() {
  const title = "Random People App";
  const techList = ["React", "TypeScript", "Vite"];
  return (
    <>
      <Header title={title} />
      <Main />
      <Footer techList={techList} />
    </>
  );
}

export default App;
