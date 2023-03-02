import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import axios from "../api";
import React, { useState, useEffect } from 'react';
import Expense from './Expense';
import Input from './Input';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from './Navbar';
import Stack from '@mui/material/Stack';
import './Expense.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Row } from 'react-bootstrap';


function Home() {
  const [expense, setExpense] = useState([]);
  const [totalAmount, setTotalamount] = useState([]);
  const [callGetExpense, setCallGetExpense] = useState(true);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('error');
  const [openWarning, setOpenWarning] = useState(false);

  function getExpense() {
    setOpenBackDrop(true)

    axios.get('/getExpense')
      .then((response) => {
        console.log("res:", response);
        setExpense(response.data.results)

        let sum = 0;
        let arr = response.data.results;
        for (let val = 0; val < arr.length; val++) {
          if (isNaN(arr[val].amount) == false) {
            sum += arr[val].amount;
          }
        }
        setTotalamount(sum);

      }).catch((err) => {
        console.log(err);
      })
    setOpenBackDrop(false);
  }

  function clearAll() {

    axios.post('/clearAll', {}).then((response) => {
      if (response.data.success) {
        setCallGetExpense(!callGetExpense)
        setOpen(true)
        setSeverity('success')
        setMessage('All Expenses Cleared Succesfully')
      }
      else {
        setOpen(true)
        setSeverity('error')
        setMessage('Error In Clearing All Expenses')
        setCallGetExpense(!callGetExpense)
      }
    })

    setOpenWarning(false);
  }
  

  function handleClearALL()
  {
    if(expense.length == 0)
    {
      setOpen(true)
      setSeverity('warning')
      setMessage('All expenses are already cleared')
    }
    else{
      setOpenWarning(true);
    }   

  }

  useEffect(() => {

    getExpense()

  }, [callGetExpense]);


  return (
    <div className="App">

      <Grid container item justifyContent="center">
        <h1>Total Expense - $ {totalAmount}</h1>
      </Grid>

      <Input setCallGetExpense={setCallGetExpense} callGetExpense={callGetExpense} setOpenBackDrop={setOpenBackDrop} openBackDrop={openBackDrop} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity} open={open} message={message} severity={severity} />
      <Grid container item xs={8.3} sx={{ marginRight: '0px' }} alignItems="center" justifyContent="flex-end">
        <Button variant="contained" sx={{ height: '40px', marginRight: '0px', marginBottom: '10px' }} onClick={handleClearALL} >Clear ALL</Button>
      </Grid>

      <Dialog
        open={openWarning}
        onClose={()=>{setOpenWarning(false)}}
      >
        <DialogTitle id="alert-dialog-title">
          {" Are you sure that you want to clear all expenses?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=>{setOpenWarning(false)}}>No</Button>
          <Button onClick={clearAll} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <div id="App" >
        {
          expense.map((item) => {
            return (< Expense name={item.name} amount={item.amount} id={item._id} setCallGetExpense={setCallGetExpense} callGetExpense={callGetExpense} setOpenBackDrop={setOpenBackDrop} openBackDrop={openBackDrop} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity} />);

          })}
     
        <div>
          <Backdrop
            sx={{ color: '#fff' }}
            open={openBackDrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
    </div>

  );
}

export default Home;