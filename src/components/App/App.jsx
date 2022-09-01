// import React, { Component } from 'react';
// import { useState, useEffect } from 'react';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid';

import useLocalStorage from 'hooks/useLocalStorage';
// import useLocalStorage from '../../hooks/useLocalStorage';
import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';


//? Перенесен в '../../hooks/useLocalStorage';
//! Хук useLocalStorage:
//! 1. Хранит State,
//! 2. Инициализирует State из localStorage
//! 3. Каждый раз обновляет localStorage при обновлении State,
// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(localStorage.getItem(key)) ?? defaultValue
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(state));
//   }, [state]);

//   return [state, setState];
// }
//! ______________Хук useLocalStorage ____________________

//? * +++++++++++++++++++++++++++ CLASS ++++++++++++++++++++++++++++++++++
// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: ''
//   };

export const App = () => {

// * +++++++++++++++++++++++++++ МЕТОДЫ ++++++++++++++++++++++++++++++++++
  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }


  // componentDidUpdate(_, prevState) {
  //   const prevContacts = prevState.contacts;
  //   const nextContacts = this.state.contacts;

  //   if (nextContacts !== prevContacts) {
  //     //? записываю contacts в хранилище localStorage:
  //     this.saveLocalStorage(nextContacts);
  //   }
  // }



  //! useState ===> contacts (аналог this.state.contacts)
  //! Аналог componentDidMount()
  //! При первом RENDER из localStorage записываем в contacts
  //! Если localStorage = null, записываем в contacts = []
  //! lazy state initialization contacts
  const [contacts, setContacts] = useLocalStorage("contacts", []); //! 2-ой вариант
  
  //? 1-ый вариант
  // const [contacts, setContacts] = useState(() => {
  //   // console.log("Делаем начальное состояние для useState ===> contacts"); //!
  //   return JSON.parse(localStorage.getItem('contacts')) ?? []
  // });
  
  //! useState ===> filter (аналог this.state.filter)
  const [filter, setFilter] = useState('');

  //? 1-ый вариант
  // //! Аналог componentDidUpdate():
  // //! При изменении contacts записываем contacts в localStorage + Render
  // useEffect(() => {
  //   saveLocalStorage(contacts);
  // }, [contacts]);

  
  //? 1-ый вариант
  // //! Запись contacts в localStorage
  // const saveLocalStorage = (contacts) => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // };



  //! Добавление контакта в this.state.contacts
  const addСontact = (name, number) => {
    const contact = {
      id: nanoid(),  
      name,
      number,
    };
    //?
    // this.setState(({ contacts }) => ({
    //   contacts: [...contacts, contact],
    // }));

    setContacts(prevState => 
      [...prevState, contact]);
  };



  //! Принимаем пропсы (name, number) из ContactForm
  //! alert с предупреждением о наявности контакта
  const formSubmitHandler = (name, number) => {
    // const contacts = this.state.contacts  //?
    
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      // this.addСontact(name, number); //?
      addСontact(name, number); 
      }
  };



  //! запись значения из input-(Find contacts by name) в this.setState.filter
  const changeFilter = (event) => {
    // this.setState({ filter: event.currentTarget.value }); //?
    setFilter(event.currentTarget.value); 
  };



  //! Создание нового массива объектов из this.state.contacts с учетом значения поиска из this.state.filter
  const getVisibleContacts = () => {
    // const { filter, contacts } = this.state; //?
    const normalizedFilter = filter.toLowerCase();

    // console.log("getVisibleContacts contacts: ", contacts); //!

    return contacts.filter(contact =>
      (contact.name.toLowerCase()).includes(normalizedFilter),
    );
  };



  //! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  const deleteTodo = contactId => {
    // this.setState(prevState => ({
    //   contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    // }));

    setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)));
  };



//? * +++++++++++++++++++++++++++ RENDER ++++++++++++++++++++++++++++++++++
  // render() { //?

    // const { contacts, filter } = this.state; //?
  // const visibleContacts = this.getVisibleContacts(); //?
  
  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1000} />

        <h1>Phonebook</h1>

        {/* <ContactForm onSubmit={this.formSubmitHandler} /> //? */}
        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

        <Filter
          value={filter}
          // onChange={this.changeFilter} //?
          onChange={changeFilter}
        />
        
        <ContactList
          visibleContacts={visibleContacts}
          // onDeleteTodo={this.deleteTodo} //?
          onDeleteTodo={deleteTodo}
        />

      </Container>
    );
  }
// } //?
