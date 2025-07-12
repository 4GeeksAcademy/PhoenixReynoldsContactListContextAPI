import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { useActions } from "../hooks/useActions.js"; //import useActions

{/* 
	{
  "name": "Beeglo",
  "phone": "555-420-6969",
  "email": "beeglothajuicer@yahoo.com",
  "address": "444 bunk street"
}
   */}

export const Home = () => {
	const {getContactInfo}=useActions(); //import getContactInfo function from useActions
	const { store, dispatch } = useGlobalReducer();
	const { contacts, setContacts} = useState([]); // on change of contacts objects, reload page with updated info

	useEffect(() => { //useeffect causes createuser to run on -app start- info update
    createUser();
	getContactInfo();
    }, []);

	//add a fetch for getting contact array from https://playground.4geeks.com/contact/agendas/PhoenixReynolds/contacts

	const createUser = async () => { //automatically creates user
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/PhoenixReynolds",
      { method: "POST" }
    );
    const data = await response.json();
    return data;
    };


	return (
		<div className="text-center d-flex flex-column bg-success" style={{ maxHeight: '76vh' }}>
			<h1 className="bg-light mb-0 py-1">Contacts</h1>
			<div className="flex-grow-1 overflow-auto"> {/* Container div for styling: scroll bar and expand for footer */}
				{
							store.contacts.map( //maps information from the characters array to this element; needs to access the info from the store because of the way it is
								(char, ind) => < ContactCard key={ind} props={char} /> // char and ind are passed into PeopleCards.jsx, with char as the properties and index as the key
							)
						}
			</div>
		</div>
	);
}; 