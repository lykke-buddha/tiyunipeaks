import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { RoleSelectionPage } from './pages/auth/RoleSelectionPage';
import { SignupWizard } from './pages/auth/SignupWizard';
import { CustomerDashboard } from './pages/dashboard/CustomerDashboard';
import { AuthGuard } from './components/auth/AuthGuard';
// import { GuestHome } from './pages/GuestHome';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-[#9CA3AF] topographic-bg antialiased selection:bg-orange-500 selection:text-white font-sans">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<WelcomePage />} />
          <Route path="/auth/choice" element={<RoleSelectionPage />} />
          <Route path="/auth/signup" element={<SignupWizard />} />
          <Route path="/dashboard/*" element={
            <AuthGuard>
              <CustomerDashboard />
            </AuthGuard>
          } />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add more routes here as we build them */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
