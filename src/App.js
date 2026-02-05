
import './App.css';

import Container from '@mui/material/Container';
import DailyWeather from './components/DailyWeather';

function App() {

  return (
    <>
      
      <Container maxWidth="md" className="App">
        
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
          <DailyWeather />
        </div>

      </Container>
    </>
  );
}

export default App;
