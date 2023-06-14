import Search from './components/Search'
import User from './components/User'
import {Routes, Route} from 'react-router-dom'
import './style/index.css';

function App() {
  return (    
      <main>
        <div className='container'>
          <Routes>
            <Route exact path="/gitsearch" element={<Search/>} /> 
            <Route path="/gitsearch/user/:userName" element={<User/>} />        
          </Routes>
        </div>
      </main>         
  );
}

export default App;

