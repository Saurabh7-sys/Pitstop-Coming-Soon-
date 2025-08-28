import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Services from './Services/Services';
import DesktopView from './DesktopView/DesktopView';
import Footer from './components/Footer/Footer';
import NotifyMe from './components/NotifyMe/NotifyMe';

const root = ReactDOM.createRoot(document.getElementById('root'));

function RootComponent() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 786);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 786);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.StrictMode>
      <App />
      {isMobile ? <Services /> : <DesktopView />}
      <Footer />
      <NotifyMe />
    </React.StrictMode>
  );
}

root.render(<RootComponent />);
reportWebVitals();
