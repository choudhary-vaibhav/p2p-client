import './HomePage.css';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

    const navigate = useNavigate();

    const navigateBorrower = () => {
        navigate('/borrower')
    }

    const navigateLender = () => {
        navigate('/lender')
    }

    return <>
        <div className='page'>
            <h1 className='p2p'>
            P2P Lending & Borrowing App
            </h1>
            <p id='p2p-para'>
                We connect borrowers directly to investors!
            </p>
            <div className="card1">
                    <button onClick={navigateBorrower} className='home-button'>Need Money</button>
                    <button onClick={navigateLender} className='home-button'>Invest Money</button>
            </div>
        </div>
    </>
}