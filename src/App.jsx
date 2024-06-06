import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Private from "./pages/Private.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";

function App() {
  const { session, loading } = useSupabaseAuth();

  if (loading) {
    return <div>Loading...</div>; // Or some other appropriate loading indicator
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/login" element={session ? <Navigate to="/" /> : <Login />} />
        <Route path="/private" element={session ? <Private /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;