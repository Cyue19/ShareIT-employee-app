import React,{ useState} from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route}
from 'react-router-dom';
import './App.css';
import Card from './components/Card'

function App() {
  const [name, setName] = useState('Employee Name');
  const [job, setJob]= useState('Job role');
  const [manager, setManager]=useState('Manager');
  return (
    <>
     <Router>
       <Navbar />
       <Card name={'Ana Severino'} job={'Talent Manager'} manager={'Silvia Marques'} />
       <Switch>
          <Route path='/' exact  />
          
       </Switch>
      </Router>
     
      </>
    
  );
}

export default App;
