import { useEffect, useState } from 'react';
import './TableRow.css';

export const TableRow = ({object, Fn}) => {
    const [modalTitle, setModalTitle] = useState('');

    useEffect(()=>{
        setModalTitle(object.title);
    },[]);

    const onSubmit = () => {
        Fn(object.loanID, object.account, object.amount);
    }

    

    return <>
        <tr key={object.loanID}>
            <td>
                {object.account}
            </td>
            <td>
                {object.amount}
            </td>
            <td>
                {object.dueDate}
            </td>
            <td>
                {object.interest}%
            </td>
            <td type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <u>
                {object.giveOrTake}
                </u>
            </td>
            <td>
                {object.status}
            </td>
        </tr>


         {/* Modal View for Add to Portfolio */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><b>{modalTitle}</b></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div key={object.loanID} class="mb-3">
                            <p>Borrower Add: {object.account}</p>
                            <p>Amount: {object.amount}</p>
                            <p>Interest: {object.interest}%</p>
                            <p>Due Date: {object.dueDate}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={onSubmit} type="button" data-bs-dismiss="modal" class="btn btn-primary">{object.submit_button_name}</button>
                    </div>
                    </div>
                </div>
            </div>
    </>
}