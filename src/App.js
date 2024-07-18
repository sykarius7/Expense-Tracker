
import './App.css';
import About from './About';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './SignUp'
import Login from './Login';
import Main from './Main'
import FeedBack from './FeedBack';
import Transaction from './Transaction';
import DashBoard from './DashBoard';
import Summary from './Summary'
function App() {
  return (
    <div className="App">
      <Router>
        <main>
     
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/main" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feedBack" element={<FeedBack />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/dashBoard" element={<DashBoard />} />
            <Route path="/summary" element={<Summary/> } />
          </Routes>
        </main>
      </Router>
      
    
    </div>
  );
}

export default App;