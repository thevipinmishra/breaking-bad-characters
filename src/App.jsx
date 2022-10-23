import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";

// Pages
const Characters = lazy(() => import("./pages/Characters"));
const Character = lazy(() => import("./pages/Character"));

function App() {
  return (
    <BrowserRouter basename="/breaking-bad-characters">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
