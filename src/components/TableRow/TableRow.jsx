import { useEffect, useState } from 'react';
import './TableRow.css';

export const TableRow = ({object}) => {
    const [currValue, setCurrValue] = useState(0);

    useEffect(()=>{
        calculateCurrValue();
    },[]);

    

    return <>
        <tr>
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
                {object.interest}
            </td>
            <td>
                {object.giveOrTake}
            </td>
            <td>
                {object.status}
            </td>
        </tr>
    </>
}