import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Borrower } from './pages/Borrower/Borrower';
import { HomePage } from './pages/HomePage/Homepage';
import { Lender } from './pages/Lender/Lender';

function App() {
  return (
    <Routes>
        <Route path='/' element = { <HomePage/> } exact />
        <Route path='/borrower' element = { <Borrower/> } exact />
        <Route path='/lender' element = { <Lender/> } exact />
      </Routes>
  );
}

export default App;
