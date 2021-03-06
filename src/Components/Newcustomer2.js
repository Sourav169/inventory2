import React,{useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import axios from 'axios'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



export default function SimpleModal() {
  
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [landline, setLandline] = useState("");
  
  const onSubmit = async(e) =>{
    try{
    e.preventDefault();
    const newObj = {
       
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        contactNumber: contact,
        landline: landline,
    }
    await axios.post("http://localhost:8080/customers/addCustomer",newObj,)
    .then((res)=>{
       console.log(res);
      
    }).catch((err)=>{
      console.log(err.data);
    })
   
    
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setContact("");
    setLandline("");
    handleClose()
  }catch(err){
    console.log(err);
  }
    
}

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="modal-form">
                <form onSubmit={onSubmit} className = "modal-container" >
                    <div className="close-btn">
                        <div onClick={handleClose}>
                            Close
                        </div>
                    </div>
                    <div className = "left">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                         <input className="form-control" id="firstName"  value = {firstName} onChange = {(e)=>setFirstName(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input className="form-control" id="lastName"  value = {lastName} onChange = {(e)=>setLastName(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input className="form-control" id="email"  value = {email} onChange = {(e)=>setEmail(e.target.value)} required/>
                    </div>
                    </div>
                   <div className="right">
                   <div className="form-group desc">
                        <label htmlFor="address">Address</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Enter Address here"
                            value = {address}
                            onChange = {(e)=>setAddress(e.target.value)}
                        />
                    </div>
                 
                    <div className="form-group">
                        <label htmlFor="contact">Contact: </label>
    
                        <input className="form-control" id="contact"  value = {contact} onChange = {(e)=>setContact(e.target.value)} required/>
                    
                    </div>
                    <div className="form-group">
                        <label htmlFor="landline">Landline</label>
                        <input className="form-control" id="landline"  value = {landline} onChange = {(e)=>setLandline(e.target.value)} required/>
                    </div>
                   </div>
                    
    
                    <div className="form-group">
                        <button className="form-control btn" type="submit">
                                Submit
                        </button>
                    </div>
                </form>
          
        </div>
  );

  return (
    <div>
      <button className="addcust" type="submit"  onClick={handleOpen}> 
                                Add customer
                        </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
