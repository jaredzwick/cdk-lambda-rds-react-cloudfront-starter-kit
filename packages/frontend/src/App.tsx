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
import { ThemeProvider } from "./contexts/ThemeContext";
import { Authenticator } from "@aws-amplify/ui-react";
import { Bookings } from "./pages/Bookings";
function App() {
  return (
    <ThemeProvider>
      <Authenticator.Provider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
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
                <Route path="/bookings" element={<Bookings />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}
export default App;
