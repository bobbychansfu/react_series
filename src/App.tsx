import "./App.css";
import { useState } from "react";

import { Main, Header, Footer } from "@components";

function App() {
  const title = "Random People App";
  const techList = ["React", "TypeScript", "Vite"];
  const [query, setQuery] = useState("");
  return (
    <>
      <Header title={title} setQuery={setQuery} />
      <Main query={query} />
      <Footer techList={techList} />
    </>
  );
}

export default App;
