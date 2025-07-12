// Ryan teaching me to make functions global instead of porting them all over the place
// Utilizes hooks within React hooks' rules (will not break, will tell you if it does)
import useGlobalReducer from "./useGlobalReducer";

export const useActions = () => {
    const { store, dispatch } = useGlobalReducer(); // gives files access to the store, deconstructed to allow use of store and dispatch individually

    const getContactInfo = async () => { // recommended to use after get, post, and delete to update the array and keep the front and backend in sync
        const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/PhoenixReynolds/contacts",
        );
        const data = await response.json(); // .json method already turns it from json to string, stringify not needed here
        console.log(data)
        dispatch({ // dispatches an action to the state; sets the data of the store
            type: "set_contacts", //custom name for identification
            payload: data.contacts //grabbing specifically the array I need
        })
        return data;
    };

    const deleteContact = async (id) => { //have to pass id here so the fetch knows what to delete from the backend
        const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/PhoenixReynolds/contacts/${id}`,
        {method: "DELETE"}
        );
        await getContactInfo();
        return
    };

    return {
        getContactInfo, deleteContact // any new functions must be added here
    }
}