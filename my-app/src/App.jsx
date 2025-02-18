import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import Layout from './components/Layout/Layout';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
