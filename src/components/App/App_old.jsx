import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid';

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';




// * +++++++++++++++++++++++++++ CLASS ++++++++++++++++++++++++++++++++++
export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };



// * +++++++++++++++++++++++++++ МЕТОДЫ ++++++++++++++++++++++++++++++++++
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }


  componentDidUpdate(_, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (nextContacts !== prevContacts) {
      //! записываю contacts в хранилище localStorage:
      this.saveLocalStorage(nextContacts);
    }
  }


  //! Запись contacts в localStorage
  saveLocalStorage = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };



  //! Добавление контакта в this.state.contacts
  addСontact = (name, number) => {
    const contact = {
      id: nanoid(),  
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };



  //! NEW - передача пропсов name и number из ContactForm
  //! alert с предупреждением о наявности контакта
  formSubmitHandler = (name, number) => {
    const contacts = this.state.contacts 
    
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      this.addСontact(name, number); 
      }
  };



  //! запись значения из input-(Find contacts by name) в this.setState.filter
  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };



  //! Создание нового массива объектов из this.state.contacts с учетом значения поиска из this.state.filter
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };



  //! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  deleteTodo = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };



// * +++++++++++++++++++++++++++ RENDER ++++++++++++++++++++++++++++++++++
  render() {

    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const totalContacts = contacts.length;



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1000} />

        <h1>Phonebook</h1>

        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

        <Filter
          value={filter}
          onChange={this.changeFilter}
        />
        
        <ContactList
          visibleContacts={visibleContacts}
          onDeleteTodo={this.deleteTodo}
        />

      </Container>
    );
  }
}
