import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Signin from "./pages/Signin";
import AuthProvider, { useAuth } from "./contexts/auth/AuthContext";
import { WorkoutProvider } from "./contexts/workout/WorkoutContext";
import SigninLayout from "./layouts/SigninLayout";

import Singup from "./pages/Signup";
import SignupLayout from "./layouts/SignupLayout";

function router() {
  return (
    <Router>
      <AuthProvider>
        <WorkoutProvider>
          <Routes>
            <Route
              path="/sign-in"
              element={<RouteWrapper layout={SigninLayout} page={Signin} />}
            />
            <Route
              path="/sign-up"
              element={<RouteWrapper layout={SignupLayout} page={Singup} />}
            />
            {/* <PrivateRoute path="/" layout={DashboardLayout}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/workout" layout={DashboardLayout}>
              <Workout />
            </PrivateRoute>
            <PrivateRoute path="/profile" layout={DashboardLayout}>
              <Profile />
            </PrivateRoute> */}
          </Routes>
        </WorkoutProvider>
      </AuthProvider>
    </Router>
  );
}

function RouteWrapper({ layout: Layout, page: Page }) {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

function PrivateRoute({ path, layout: Layout, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return <Route path={path} element={<Layout>{children}</Layout>} />;
}

export default router;
