import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { useActions } from "../hooks/useActions.js"; //import useActions
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditContact = () => {
    const { getContactInfo } = useActions(); //import getContactInfo function from useActions
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const {id} = useParams(); //grabs the id out of the url

    const [ editedContact, setEditedContact ] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        const currentContact = store.contacts.filter((contact) => contact.id === parseInt(id))[0] //parseInt makes sure it's always an integer, not a string; === checks for data type and value, if type doesn't match it'll throw an error
        //when page is entered, we go through store.contacts, trying to find a contact within them with the same ID as what was passed into the URL
        // contact card (and line 12); useParams figures out what the ID that was passed into the URL was
        setEditedContact({
        name: currentContact.name,
        address: currentContact.address,
        phone: currentContact.phone,
        email: currentContact.email
    });
    },[store.contacts])
    

    //add a fetch for getting contact array from https://playground.4geeks.com/contact/agendas/PhoenixReynolds/contacts

    const EditContact = async () => {
    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/PhoenixReynolds/contacts/${id}`,
      { method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: editedContact.name,
            address: editedContact.address,
            phone: editedContact.phone,
            email: editedContact.email
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
                <h1 className="text-center">Edit Contact</h1>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6"> {/* add ternaries to show empty inputs for post, and filled out inputs for put */}
                        <label htmlFor="inputname" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" value={editedContact.name} onChange={(event)=> setEditedContact({...editedContact, name: event.target.value})} /> {/* same way that dispatch changes the store */}
                        <label htmlFor="inputaddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" value={editedContact.address} onChange={(event)=> setEditedContact({...editedContact, address: event.target.value})} />
                        <label htmlFor="inputphone" className="form-label">Phone #</label>
                            <input type="text" className="form-control" id="phone" value={editedContact.phone} onChange={(event)=> setEditedContact({...editedContact, phone: event.target.value})} />
                        <label htmlFor="inputemail" className="form-label">E-Mail Address</label>
                            <input type="text" className="form-control" id="email" value={editedContact.email} onChange={(event)=> setEditedContact({...editedContact, email: event.target.value})} />
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="mt-2 d-flex flex-column">
                    <button className="btn btn-success mx-auto my-3" style={{ width: "20rem" }} onClick={EditContact}>Save</button>
                    <Link to="/Home" className="btn btn-secondary mx-auto" style={{ width: "20rem" }}> Cancel </Link>
                </div>
            </div>
        </div>
    );
}; 