import './App.css';
import RoutesApp from './Routes'
import UserContext from './context/UserContext'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserContext>
      <RoutesApp />
    </UserContext>
  );
}

export default App;
