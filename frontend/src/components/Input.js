import "./Input.css";
import axios from "../api.js";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';

function Input({ setCallGetExpense, callGetExpense, setOpenBackDrop, openBackDrop, setOpen, setMessage, setSeverity, open, message, severity }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    //addexpense fun
    function addExpense() {
        if (name == null || name == '') {
            setOpen(true);
            setMessage("Invalid value of Name")
            setSeverity('error')
            return;
        }
        if (amount == null || amount == '' || isNaN(amount)) {
            setOpen(true);
            setMessage("Invalid value of Amount ")
            setSeverity('error')
            return;
        }
        setOpenBackDrop(true);

        console.log("abc");
        axios.post('/addExpense', {
            name: name,
            amount: amount,
        },).then((response) => {
            console.log("addExpense is working");
            setCallGetExpense(!callGetExpense)
            setOpen(true)
            setSeverity('success')
            setMessage('Expense Added Succesfully')
            setName('')
            setAmount('')

        });
        setOpenBackDrop(false);
    }

    return (
        <div className="App">
            <Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }} anchorOrigin={{
                horizontal: "right",
                vertical: "top",
            }}>
                <Alert onClose={() => { setOpen(false) }} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '20%', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#fff', width: '30%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <form >
                        <div className="input-group">
                            <TextField id="name" label="Name" variant="outlined" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            {/* <input  id="name" value={name} onChange={(e) => setName(e.target.value)} /> */}

                        </div>

                        <div className="input-group">

                            <TextField id="amount" label="Amount" variant="outlined" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            {/* <input type="number" id="amount"  /> */}
                        </div>
                        <div style={{ justifyContent: "center", marginTop: '35px' }}>

                            <Button variant="contained" onClick={() => { addExpense() }}>submit</Button>
                        </div>
                    </form>
                </div>
            </Grid>
        </div>

    );
}

export default Input;