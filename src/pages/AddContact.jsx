import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { useActions } from "../hooks/useActions.js"; //import useActions
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
    const { getContactInfo } = useActions(); //import getContactInfo function from useActions
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [ contact, setContact ] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    //add a fetch for getting contact array from https://playground.4geeks.com/contact/agendas/PhoenixReynolds/contacts

    const CreateContact = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/PhoenixReynolds/contacts",
      { method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: contact.name,
            address: contact.address,
            phone: contact.phone,
            email: contact.email
        })
      }
    );
    const data = await response.json();
    navigate("/");
    return data;
    };

    return (
        <div className="mt-3">
            <div className="container"> {/* Container div for styling */}
                <h1 className="text-center">Add Contact</h1>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6"> {/* add ternaries to show empty inputs for post, and filled out inputs for put */}
                        <label htmlFor="inputname" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" value={contact.name} onChange={(event)=> setContact({...contact, name: event.target.value})} /> {/* same way that dispatch changes the store */}
                        <label htmlFor="inputaddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" value={contact.address} onChange={(event)=> setContact({...contact, address: event.target.value})} />
                        <label htmlFor="inputphone" className="form-label">Phone #</label>
                            <input type="text" className="form-control" id="phone" value={contact.phone} onChange={(event)=> setContact({...contact, phone: event.target.value})} />
                        <label htmlFor="inputemail" className="form-label">E-Mail Address</label>
                            <input type="text" className="form-control" id="email" value={contact.email} onChange={(event)=> setContact({...contact, email: event.target.value})} />
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="mt-2 d-flex flex-column">
                    <button className="btn btn-success mx-auto my-3" style={{ width: "20rem" }} onClick={CreateContact}>Create Contact</button>
                    <Link to="/Home" className="btn btn-secondary mx-auto" style={{ width: "20rem" }}> Cancel </Link>
                </div>
            </div>
        </div>
    );
}; 