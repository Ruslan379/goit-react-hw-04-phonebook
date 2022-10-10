
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid';

import useLocalStorage from 'hooks/useLocalStorage';

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';





export const App = () => {

  //! useState ===> contacts (аналог this.state.contacts)
  //! Используем Хук useLocalStorage (hooks/useLocalStorage):
  const [contacts, setContacts] = useLocalStorage("contacts", []); 
  
  //! useState ===> filter (аналог this.state.filter)
  const [filter, setFilter] = useState('');




  //! Добавление контакта в this.state.contacts
  const addСontact = (name, number) => {
    const contact = {
      id: nanoid(),  
      name,
      number,
    };
    setContacts(prevState => 
      [...prevState, contact]);
  };



  //! Принимаем пропсы (name, number) из ContactForm
  //! alert с предупреждением о наявности контакта
  const formSubmitHandler = (name, number) => {
    
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      addСontact(name, number); 
      }
  };



  //! запись значения из input-(Find contacts by name) в this.setState.filter
  const changeFilter = (event) => {
    setFilter(event.currentTarget.value); 
  };



  //! Создание нового массива объектов из this.state.contacts с учетом значения поиска из this.state.filter
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      (contact.name.toLowerCase()).includes(normalizedFilter),
    );
  };



  //! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  const deleteContact = contactId => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)));
  };



  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1000} />

        <h1>Phonebook</h1>

        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>


        {contacts.length > 0 &&
          (<Filter
          value={filter}
          onChange={changeFilter}
          />
        )}
        

        {contacts.length > 0 &&
          (<ContactList
          visibleContacts={visibleContacts}
          onDeleteContact ={deleteContact}
          />
        )}

      </Container>
    );
  }
