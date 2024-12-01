import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import "@aws-amplify/ui-react/styles.css";
import { CustomAuthenticator } from "./auth/CustomAuthenticator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<CustomAuthenticator />} />
      </Routes>
    </Router>
  );
}

export default App;
