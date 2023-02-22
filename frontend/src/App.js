import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import Login from './base/Login';
import Home from './base/Home';
import Register from './base/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Login/>
      </Router>
    </div>
  );
}

export default App;
