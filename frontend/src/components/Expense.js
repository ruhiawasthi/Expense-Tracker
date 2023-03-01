// import Container from 'react-bootstrap/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import axios from "../api";
import './Expense.css';

export default function Expense(props) {

    function handleRemove() {
        props.setOpenBackDrop(true);
        axios.post('/removeExpense', {
            id: props.id
        }).then((response) => {
            if (response.data.success) {
                props.setCallGetExpense(!props.callGetExpense)
                props.setOpen(true)
                props.setSeverity('success')
                props.setMessage('Expense Removed Succesfully')
            }
            else {
                props.setOpen(true)
                props.setSeverity('error')
                props.setMessage('Error In Expense Removal')
                props.setCallGetExpense(!props.callGetExpense)
            }
        }
        )
        props.setOpenBackDrop(false);
    }
    return (
        <Grid sx={{ marginTop: '5px' }} container justifyContent="center">
            <Card sx={{ width: '40%' }}>
                <Stack direction="row" spacing={10}>
                    <Grid item xs={15} sx={{ marginLeft: '10px' }} >
                        <h2>{props.name} - $ {props.amount}</h2>
                    </Grid>

                    <Grid container item xs={8} sx={{ marginRight: '20px' }} alignItems="center" justifyContent="flex-end">
                        <Button variant="contained" size="small" sx={{ height: '30px', marginRight: '20px' }} onClick={handleRemove}>Remove</Button>
                    </Grid>
                </Stack>

            </Card>
        </Grid>

    );
}