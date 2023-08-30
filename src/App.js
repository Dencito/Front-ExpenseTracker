import './App.css';
import RoutesApp from './Routes'
import UserContext from './context/UserContext'

function App() {
  return (
    <UserContext>
      <RoutesApp />
    </UserContext>
  );
}

export default App;
