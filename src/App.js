import { createTheme, ThemeProvider } from "@mui/material";
import AppRoutes from "./routes";


function App() {
  const THEME = createTheme({
    palette: {
      primary: {
        main: '#5E3480',
        contrastText: '#fff',
      }
    },
  });
  return (
    <ThemeProvider theme={THEME}>
      <AppRoutes />
    </ThemeProvider>
  );
}
export default App;
