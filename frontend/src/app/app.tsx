import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OrdersList from './pages/OrdersList';
import OrderDetails from './pages/OrderDetails';
import { ApiTest } from './components/ApiTest';

// Create Material UI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/orders/:id/edit" element={<div>Edit Order Page (To be implemented)</div>} />
          <Route path="/orders/new" element={<div>New Order Page (To be implemented)</div>} />
          <Route path="/analytics" element={<div>Analytics Page (To be implemented)</div>} />
          <Route path="/settings" element={<div>Settings Page (To be implemented)</div>} />
          <Route path="/about" element={<div>About Page (To be implemented)</div>} />
          <Route path="/api-test" element={<ApiTest />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
