import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { PersonModal } from "@components";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/people" element={<App />}>
          <Route path=":id" element={<PersonModal />} />
        </Route>
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
