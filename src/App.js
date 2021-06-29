import React,{ useState} from 'react';
import Card from './components/Card'

function App() {
  const [name, setName] = useState('Employee Name');
  const [job, setJob]= useState('Job role');
  const [manager, setManager]=useState('Manager');
  return (
    <>
     
       <Card name={'Ana Severino'} job={'Talent Manager'} manager={'Silvia Marques'} />
       
       <Card name={'André Alves'} job={'Developer'} manager={'Silvia Marques'} />
      
     
      </>
    
  );
}

export default App;
