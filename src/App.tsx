import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import AppRouter from './routes';

// import { MapAPIKey } from "@env"

function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter >
  );
}

export default App;
