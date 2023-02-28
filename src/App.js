import { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

function App() {
  const contactsClone = contactsJSON.slice(0, 5);
  const [contacts, setContacts] = useState(contactsClone);

  const handleAddRandom = () => {
    //if data is loaded already
    if (contacts.length === contactsJSON.length) {
      console.log("Data is already loaded");
      return;
    }

    const randomNumber = Math.floor(Math.random() * contactsJSON.length);
    let contactsClone = [...contacts];

    //recursion
    let isContactRepeated = false;
    contactsClone.forEach((contact) => {
      if (contact.id === contactsJSON[randomNumber].id) {
        isContactRepeated = true;
      }
    });

    if (isContactRepeated) {
      handleAddRandom();
      return;
    }

    contactsClone.unshift(contactsJSON[randomNumber]);
    setContacts(contactsClone);
  };

  const handleSortByName = () => {
    let contactsClone = [...contacts];

    contactsClone.sort((elem2, elem1) => {
      if (elem2.name[0] > elem1.name[0]) {
        return 1;
      } else if (elem2.name[0] > elem1.name[0]) {
        return -1;
      } else {
        return 0;
      }
    });

    setContacts(contactsClone);
  };

  const handleSortByPopularity = () => {
    let contactsClone = [...contacts];

    contactsClone.sort((elem2, elem1) => {
      if (elem2.popularity < elem1.popularity) {
        return 1;
      } else if (elem2.popularity > elem1.popularity) {
        return -1;
      } else {
        return 0;
      }
    });

    setContacts(contactsClone);
  };

  const handleRemoveContact = (id) => {
    //filter by not equal id
    const contactFiltered = contacts.filter((element) => element.id !== id);

    setContacts(contactFiltered);
  };

  return (
    <div className="App">
      <h2>Iron Contacts</h2>
      <div className="btn-container">
        <button onClick={handleAddRandom}>Add Random Contact Btn</button>
        <button onClick={handleSortByName}>Sort By Name</button>
        <button onClick={handleSortByPopularity}>
          Sort by Popularity Contacts
        </button>
      </div>
      <table id="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img width={"100px"} src={contact.pictureUrl} alt="" />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar ? "🏆" : null}</td>
                <td>{contact.wonEmmy ? "🏆" : null}</td>
                <td>
                  <button onClick={() => handleRemoveContact(contact.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
