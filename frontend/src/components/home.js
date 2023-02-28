import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import axios from "../api";
import React, { useState, useEffect } from 'react';
import Expense from './Expense';
import Input from './Input';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from './Navbar';
import './Expense.css';


function Home() {
  const [expense, setExpense] = useState([]);
  const [totalAmount, setTotalamount] = useState([]);
  const [callGetExpense, setCallGetExpense] = useState(true);
  const [openBackDrop, setOpenBackDrop] = useState(false);

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

  useEffect(() => {

    getExpense()

  }, [callGetExpense]);


  return (
    <div className="App">
  
      <Grid container item justifyContent="center">
        <h1>Total Expense - $ {totalAmount}</h1>
      </Grid>
      <Input setCallGetExpense={setCallGetExpense} callGetExpense={callGetExpense} setOpenBackDrop={setOpenBackDrop} openBackDrop={openBackDrop} />
      <div id="App" >
        {
          expense.map((item) => {
            return (< Expense name={item.name} amount={item.amount} id={item._id} setCallGetExpense={setCallGetExpense} callGetExpense={callGetExpense} setOpenBackDrop={setOpenBackDrop} openBackDrop={openBackDrop}/>);

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