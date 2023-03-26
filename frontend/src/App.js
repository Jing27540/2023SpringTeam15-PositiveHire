import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import Base from './base/Base';

function App() {
  return (
    <div className="App">
      <Router>
        <Base/>
      </Router>
    </div>
  );
}

export default App;
