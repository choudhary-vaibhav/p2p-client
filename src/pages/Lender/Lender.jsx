import './Lender.css';
import { useEffect, useState } from 'react';

export const Lender = () => {
    const [wallet, setWallet] = useState(0);
    const [accNo, setAccNo] = useState('Connect Metamask!');

    useEffect(() => {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
          console.log('MetaMask is installed!');
          
          // Request account access if needed
          window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(function(accounts) {
              const userAccount = accounts[0]; // Assuming the first account
    
              // Log the user's account to the console
              console.log('MetaMask account:', userAccount);
              setAccNo(userAccount);
            })
            .catch(function(error) {
              console.error('Error fetching account:', error);
            });
        } else {
          console.error('MetaMask is not installed');
        }
    }, []);

    return <>
        <div className='page'>
            <div>
                <h1>Hello Lender!</h1>
                <h3>You can look for borrowers to lend money!</h3>
                <h3>Wallet Amount: {wallet} ETH ({accNo})</h3>
            </div>

            <div id='table-card'>
                <table>
                    <tr>
                        <th style={{ width: '250px' }} >Borrower Address</th>
                        <th style={{ width: '100px' }} >Amount</th>
                        <th style={{ width: '100px' }} >Due Date</th>
                        <th style={{ width: '100px' }} ></th>
                        <th style={{ width: '100px' }} ></th>
                        <th style={{ width: '100px' }} >Status</th>
                    </tr>

                    {/* {load?
                        <div className='loading'>
                        <img className='loading-img' src={loading}></img>
                        </div>
                        :
                        portfolioArr.map(obj => {
                            return(
                                <TableRow object={obj}></TableRow>
                            )
                        })
                    } */}
                </table>
            </div>
        </div>
    </>
}

