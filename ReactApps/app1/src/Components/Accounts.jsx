export default function Accounts(props){
    const ackName = props.name.toUpperCase();
    const updatebalance = parseFloat(props.balance) + 500;
    return (
            <div>
                <h2>Accounts Details</h2>
                Account Holder Name: {ackName} <br/>
                Account type: {props.actype} <br/>
                Current Balance: {updatebalance} <br/>
            </div>
    );
}