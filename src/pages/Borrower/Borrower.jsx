import './Borrower.css';
import etherIcon from '../../assets/Ethereum-icon-purple.png';
import { useEffect, useState } from 'react';

export const Borrower = () => {

    const [accNo, setAccNo] = useState('');

    const [minDate, setMinDate] = useState(getToday()); // Get today's date in YYYY-MM-DD format

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
                <h1>Hello Borrower!</h1>
                <h3>Please enter details to seek loan</h3>
            </div>

            <div id='borrower-card'>
                <div class="input-container">
                <i class="fa fa-user icon"></i>
                <input disabled style={{ backgroundColor: '#d3d3d3' }} class="input-field" type="text" defaultValue={accNo} placeholder="Account No." name="account-no"/>
                </div>

                <div class="input-container">
                <img src={etherIcon} className='icon' id='ether-icon'></img>
                <input class="input-field" type="number" placeholder="Loan Amount" name="amount"/>
                </div>

                <div class="input-container">
                    <i class="fa fa-calendar-o icon"></i>
                    <input class="input-field" type="date" min={minDate} // Set the minimum date
                    onChange={(e) => setMinDate(e.target.value)} 
                    placeholder="Due Date" name="due-date"/>
                </div>

                <div class="input-container">
                    <i class="fa fa-file icon"></i>
                    <input class="input-field" type="text" placeholder="Mortgage Address" name="mortgage-add"/>
                </div>

                <button type="submit" class="btn">Submit Loan Proposal</button>
            </div>
        </div>
    </>
}