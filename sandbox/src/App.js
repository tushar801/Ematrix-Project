import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientPage from "./Components/ClientPage";
import DashboardPage from "./Components/Dashboard";
import Loginpage from "./Components/LoginPage/Loginpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/client" element={<ClientPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
