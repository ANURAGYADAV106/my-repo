import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePaste from "../pages/create";
import ViewPaste from "../pages/viewPaste";
import HealthCheck from "../pages/HealthCheck";

function approuter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/p/:id" element={<ViewPaste />} />
        <Route path="/health" element={<HealthCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default approuter;
