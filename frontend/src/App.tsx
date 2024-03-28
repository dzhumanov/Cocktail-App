import { Container, CssBaseline } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/users/usersSlice";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import { Login } from "@mui/icons-material";
import Cocktails from "./features/cocktails/Cocktails";

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

            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
