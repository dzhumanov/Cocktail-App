import { Container, CssBaseline } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/users/usersSlice";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import Cocktails from "./features/cocktails/containers/Cocktails";
import OneCocktail from "./features/cocktails/components/OneCocktail";
import Login from "./features/users/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CreateCocktail from "./features/cocktails/containers/CreateCocktail";
import MyCocktails from "./features/cocktails/containers/MyCocktails";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Cocktails />} />
            <Route path="/cocktails/:id" element={<OneCocktail />} />

            <Route
              path="/cocktails/create"
              element={
                <ProtectedRoute
                  isAllowed={
                    (user && user.role === "admin") || user?.role === "user"
                  }
                >
                  <CreateCocktail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cocktails/myCocktails"
              element={
                <ProtectedRoute
                  isAllowed={
                    (user && user.role === "admin") || user?.role === "user"
                  }
                >
                  <MyCocktails />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
