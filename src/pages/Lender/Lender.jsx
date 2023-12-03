import './Lender.css';
import { useEffect, useState } from 'react';
import { API_CLIENT } from '../../services/api-client';
import { TableRow } from '../../components/TableRow/TableRow';

export const Lender = () => {
    const [wallet, setWallet] = useState(0);
    const [accNo, setAccNo] = useState('Connect Metamask!');
    const [loanArr, setLoanArr] = useState([]);
    const [load, setLoad] = useState(true);

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
                'type': 'lender',
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
                'type': 'lender',
                'accNo': account,
            };
            console.log(userObj)
            console.log(process.env.REACT_APP_BASE_URL)
            const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/user/wallet', userObj);

            if(result.data){
                console.log(result)
                setWallet(result.data.wallet);
                getLoanDataAll();
            }else{
                createUser(account);
            }

        }catch(err){
            console.log(err);
            createUser(account);
        }
     }

     const getLoanDataAll = async () => {
        try{
            
            const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/getLoanDataAll', );

            if(result.data){
                console.log(result.data)
                setLoanArr(result.data);
                setLoad(false);
            }

        }catch(err){
            console.log(err);
        }
    }

    const approveLoan = async (loanID, borrower_acc, amount) => {
        try{
            
            const userObj = {
                "loanID": loanID,
                "amount": amount,
                "borrower_acc": borrower_acc,
                "lender_acc": accNo,
            };
            console.log(userObj)
            console.log(process.env.REACT_APP_BASE_URL)
            const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/loan/approve', userObj);

            if(result.data){
                console.log(result.data);
                window.alert("Successfully Approved!");
                window.location.reload();
            }

        }catch(err){
            console.log(err);
        }
     }




    return <>
        <div className='page'>
            <div>
                <h2 className='p2p'>Hello Lender!</h2>
                <h4>You can look for borrowers to lend money!</h4>
                <h4>Wallet Amount: {wallet} ETH ({accNo})</h4>
            </div>

            <div id='table-card'>
                <table>
                    <tr>
                        <th style={{ width: '250px' }} >Borrower Address</th>
                        <th style={{ width: '100px' }} >Amount</th>
                        <th style={{ width: '100px' }} >Due Date</th>
                        <th style={{ width: '100px' }} >Interest</th>
                        <th style={{ width: '100px' }} ></th>
                        <th style={{ width: '100px' }} >Status</th>
                    </tr>

                    {load?
                        <div>
                        </div>
                        :
                        loanArr.map(obj => {
                            const tempObj = {
                                'account': obj.borrower_acc,
                                'amount': obj.amount,
                                'interest': obj.interest,
                                'dueDate': obj.dueDate,
                                'status': obj.lender_acc !== 'N/A' ? "Accepted" : "Pending",
                                'giveOrTake': "Get Details",
                                'loanID': obj._id,
                                'title': "Approve Loan",
                                'submit_button_name': "Give Loan",
                            }
                            return(
                                <TableRow key={obj._id} object={tempObj} Fn={approveLoan}></TableRow>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    </>
}

