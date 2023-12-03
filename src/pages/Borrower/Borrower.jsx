import './Borrower.css';
import etherIcon from '../../assets/Ethereum-icon-purple.png';
import { useEffect, useRef, useState } from 'react';
import { API_CLIENT } from '../../services/api-client';
import { TableRow } from '../../components/TableRow/TableRow';

export const Borrower = () => {

    const [accNo, setAccNo] = useState('Connect Metamask!');
    const [minDate, setMinDate] = useState(getToday()); // Get today's date in YYYY-MM-DD format
    const [wallet, setWallet] = useState(0);
    const mortgage = useRef('');
    const dueDate = useRef('');
    const amount = useRef('');
    const [loanArr, setLoanArr] = useState([]);
    const [load, setLoad] = useState(true);

    // Function to get today's date in YYYY-MM-DD format
    function getToday() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
  
      // Add leading zeros if needed
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
  
      return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
        //   console.log('MetaMask is installed!');
          
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
            //   console.error('Error fetching account:', error);
              window.alert('Error fetching account:', error);
            });
        } else {
        //   console.error('MetaMask is not installed');
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
            // console.log(userObj)
            const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/user/create', userObj);

            if(result.data){
                // console.log(result.data.id)
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
            // console.log(userObj)
            const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/user/wallet', userObj);

            // console.log(result)
            if(result.data){
                setWallet(result.data.wallet);
                getLoanDataAll()
                
            }else{
                createUser(account);
            }

        }catch(err){
            console.log(err);
            createUser(account);
        }
    }

    const validateLoan = () => {
        if(amount.current.value < 1 || amount.current.value > 99){
            window.alert("Amount must be between 1 and 99!")
        }else if(!mortgage.current.value){
            window.alert("Mortgage is not present!")
        }else if(!dueDate.current.value){
            window.alert("Due Date is not set!")
        }else{
            createLoan();
        }
    }

    const createLoan = async () => {
        try{
            
            const userObj = {
                "borrower_acc": accNo,
                "amount": amount.current.value,
                "dueDate": dueDate.current.value,
                "interest":1,
                "mortgage": mortgage.current.value
            };
            // console.log(userObj)
            // console.log(process.env.REACT_APP_BASE_URL)
            const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/loan/create', userObj);

            if(result.data){
                console.log(result.data)
                window.location.reload();
            }

        }catch(err){
            console.log(err);
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

    const repayLoan = async () => {
        try{
            
            // const userObj = {
            //     'type': 'borrower',
            //     'account': account,
            //     'wallet': 100,
            // };
            // console.log(userObj)
            // const result = await API_CLIENT.post(process.env.REACT_APP_BASE_URL + '/user/create', userObj);

            // if(result.data){
            //     // console.log(result.data.id)
            //     setWallet(100);
            // }
            window.alert("Integration Pending!");

        }catch(err){
            console.log(err);
        }
    }




    return <>
        <div className='page'>
            <div>
                <h2 id='borrower-page-title'>Hello Borrower!</h2>
                <h4>Please enter details to seek loan</h4>
                <h4>Wallet Amount: {wallet} ETH</h4>
            </div>

            <div id='borrower-card'>
                <div class="input-container">
                <i class="fa fa-user icon"></i>
                <input disabled style={{ backgroundColor: '#d3d3d3' }} class="input-field" type="text" value={accNo} placeholder="Account No." name="account-no"/>
                </div>

                <div class="input-container">
                <img src={etherIcon} className='icon' id='ether-icon'></img>
                <input ref={amount} class="input-field" min="1" max="99" type="number" placeholder="Loan Amount" name="amount"/>
                </div>

                <div class="input-container">
                    <i class="fa fa-calendar-o icon"></i>
                    <input class="input-field" type="date" min={minDate} // Set the minimum date
                    onChange={(e) => setMinDate(e.target.value)}
                    ref={dueDate} 
                    placeholder="Due Date" name="due-date"/>
                </div>

                <div class="input-container">
                    <i class="fa fa-file icon"></i>
                    <input ref={mortgage} class="input-field" type="text" placeholder="Mortgage Address" name="mortgage-add"/>
                </div>

                <button type="submit" onClick={validateLoan} class="btn">Submit Loan Proposal</button>
            </div>

            <div id='table-card'>
                <table>
                    <tr>
                        <th style={{ width: '250px' }} >Lender Address</th>
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
                                'account': obj.lender_acc,
                                'amount': obj.amount,
                                'interest': obj.interest,
                                'dueDate': obj.dueDate,
                                'status': obj.lender_acc !== 'N/A' ? "Accepted" : "Pending",
                                'giveOrTake': "Repay",
                                'loanID': obj._id,
                                'title': "Repay Loan",
                                'submit_button_name': "Repay",
                            }
                            return(
                                <TableRow key={obj._id} object={tempObj} Fn={repayLoan}></TableRow>
                                
                            )
                        })
                    }
                </table>
            </div>
        </div>
    </>
}