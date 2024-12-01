import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { CustomAuthenticator } from "./auth/CustomAuthenticator";
import { Onboarding } from "./pages/Onboarding";
import { Profile } from "./pages/Profile";
import { PublicProfile } from "./pages/PublicProfile";
import { AccountSettings } from "./pages/AccountSettings";
import { VerifyAccount } from "./pages/VerifyAccount";
import { Messages } from "./pages/Messages";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<CustomAuthenticator />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cuddlers/:id" element={<PublicProfile />} />
            <Route path="/verify-account" element={<VerifyAccount />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
