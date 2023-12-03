import './Lender.css';
import { useEffect, useState } from 'react';
import { API_CLIENT } from '../../services/api-client';

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
              getWallet(userAccount);
            })
            .catch(function(error) {
              console.error('Error fetching account:', error);
              window.alert('Error fetching account:', error);
            });
        } else {
          console.error('MetaMask is not installed');
          window.alert('MetaMask is not installed');
        }
    }, []);

    const createUser = async (account) => {
        try{
            
            const userObj = {
                'type': 'borrower',
                'account': account,
                'wallet': 100,
            };
            console.log(userObj)
            const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/user/create', userObj);

            if(result.data){
                console.log(result.data.id)
                setWallet(100);
            }

        }catch(err){
            console.log(err);
        }
     }

     const getWallet = async (account) => {
        try{
            
            const userObj = {
                'type': 'borrower',
                'accNo': account,
            };
            console.log(userObj)
            console.log(process.env.REACT_APP_BASE_URL)
            const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/user/wallet', userObj);

            console.log(result)
            if(result.data){
                console.log(result)
                setWallet(result.data.wallet);
            }else{
                createUser(account);
            }

        }catch(err){
            console.log(err);
        }
     }


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

