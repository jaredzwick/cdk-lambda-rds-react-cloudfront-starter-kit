import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { CustomAuthenticator } from "./auth/CustomAuthenticator";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<CustomAuthenticator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
