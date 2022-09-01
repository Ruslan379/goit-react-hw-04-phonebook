import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { nanoid } from 'nanoid';
// import shortid from 'shortid';

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';




// * +++++++++++++++++++++++++++ CLASS ++++++++++++++++++++++++++++++++++
export class App extends Component {

  static defaultProps = {
    initialContacts: [],
    initialFilter: ''
  };


  static propTypes = {
    initialContacts: PropTypes.array.isRequired,
    initialFilter: PropTypes.string.isRequired,

    contacts: PropTypes.array,
    filter: PropTypes.string
  };



  state = {
  //   contacts: [
  //   {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  //   {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  //   {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  //   {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  // ],
    contacts: this.props.initialContacts,
    filter: this.props.initialFilter
    // name: '',
    // number: ''
  };



// * +++++++++++++++++++++++++++ МЕТОДЫ ++++++++++++++++++++++++++++++++++
  //? перенесен в ContactForm
  // contactInputId = nanoid();


  componentDidMount() {
    // console.log('App componentDidMount'); //!

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // console.log("DidMount parsedContacts: ", parsedContacts); //!

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }



  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate'); //!
    // console.log("App prevProps: ", prevProps); //!

    // const contacts = localStorage.getItem('contacts'); //?
    // const parsedContacts = JSON.parse(contacts); //?
    // console.log("DidUpdate parsedContacts: ", parsedContacts); //!


    const prevContacts = prevState.contacts;
    // console.log("App prevContacts: ", prevContacts); //!

    const nextContacts = this.state.contacts;
    // console.log("App nextContacts: ", nextContacts); //!

    // console.log(nextContacts === parsedContacts); //? false - так НЕ РАБОТАЕТ!!!
    // console.log(nextContacts.length === parsedContacts.length); //? true так НЕ РАБОТАЕТ!!!
    

    // if (nextContacts !== prevContacts && nextContacts !== parsedContacts) {
    if (nextContacts !== prevContacts) {
      // console.log('Обновилось App поле contacts, записываю contacts в хранилище'); //!
      //! записываю contacts в хранилище localStorage:
      // localStorage.setItem('contacts', JSON.stringify(nextContacts));
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
    // console.log(contact); //!
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
    // this.setState({ contacts: [ ...this.state.contacts, { id: nanoid(), name, number }  ] }) //* Так ПРАВИЛЬНО и РАБОТАЕТ!!!
    // this.state.contacts.push({ id: nanoid(), name, number }); //? Так Работает, но НЕЛЬЗЯ!!!
    // this.setState({ contacts: [this.state.contacts.push({ id: nanoid(), name, number })] }); //! Так НЕ РАБОТАЕТ!!!
  };



  //! alert с предупреждением о наявности контакта
  alertInputContact = (name, number) => {
    const contacts = this.state.contacts 
    
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      toast.warning(`${name} is already in contacts.`); //* РАБОТАЕТ!!!
      return;
    } else {
      // this.setState({ contacts }); // Обновление state.contacts - Уже НЕ НАДО!!!
      this.addСontact(name, number); 
      // записываю contacts в хранилище localStorage: ==>  НЕ ЗДЕСЬ, в componentDidUpdate!!!
      // localStorage.setItem('contacts', JSON.stringify(contacts));
      // this.saveLocalStorage(contacts);
      }
  };


  
  //! NEW - передача пропсов name и number из ContactForm
  formSubmitHandler = (name, number) => {
    // console.log("name: ", name); //!
    // console.log("number: ", number); //!
    // this.setState({ name, number }); //? 
    // console.log("state ДО: ", this.state); //!

    //! alert с предупреждением о наявности контакта
    this.alertInputContact(name, number)
    // const contacts = this.state.contacts 
    // // console.log("contacts ДО: ", contacts); //!
    
    // if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
    //     alert(`${name} is already in contacts.`);
    //     return;
    // } else {
    //   // this.setState({ name, number }); 
    // // this.setState({ contacts }); //? Обновление state.contacts - Уже НЕ НАДО!!!
    //   this.addСontact(name, number); 
    //   //? записываю contacts в хранилище localStorage:
    //   localStorage.setItem('contacts', JSON.stringify(contacts));
    //   }
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



  //? old formSubmitHandler
  // formSubmitHandler = (newState = {}, newContacts) => {
  //   // console.log("newState: ", newState); //!
  //   // console.log("newContacts: ", newContacts); //!
  //   // console.log("this.state.contacts: ", this.state.contacts); //!
  

  //   // this.setState(prevState => ({
  //   //   contacts: prevState.contacts.push({id: 'id-5', name: 'Ruslan Fate', number: '777-77-77'}),
  //   // }));

  //   // Обновление state.contacts - ВАЖНО!!!
  //   this.setState({ contacts: newContacts });

  //   // this.setState(function (prevState, props) {
  //   //   // console.log("prevState: ", prevState);
  //   //   console.log("prevState.contacts: ", prevState.contacts);
  //   //   // console.log("props: ", props);
  //   //   const ps = prevState.contacts;
  //   //   const r = { id: 'id-5', name: 'Ruslan Fate', number: '111-11-11' };

  //   //   return {
  //   //     contacts: ps.push(r)
  //   //   };
  //   // });

  //   // записываю contacts в хранилище localStorage 1-ый вариант:
  //   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  // };


  //? перенесен в ContactForm
  // handleChange = event => {
  //   // console.log(event.currentTarget); //!
  //   // console.log(event.currentTarget.name); //!
  //   // console.log(event.currentTarget.value); //!

  //   // this.setState({ name: event.currentTarget.value });
  //   // this.setState({ [event.currentTarget.name]: event.currentTarget.value });

  //   const { name, value } = event.currentTarget;
  //   this.setState({ [name]: value });
  // };


  //? перенесен в ContactForm
  // reset = () => {
  //   this.setState({ name: '', number: '' });
  // };


  //? перенесен в ContactForm
  // handleSubmit = event => {
  //   event.preventDefault();
  //   const { contacts, name, number } = this.state;

  //   // console.log(this.state); //!
  //   // console.log(this.state.contacts); //!

  //   // this.state.contacts.push(this.state.name);

  //   // const contactsObj = { name: this.state.name, id: nanoid() }
  //   // console.log(contactsObj); //!

  //   // this.state.contacts.push({ name: this.state.name, id: nanoid() });
  //   contacts.push({ id: nanoid(), name: name, number: number, });

  //   // this.props.onSubmit(this.state);

  //   this.reset();
  // };


// * +++++++++++++++++++++++++++ RENDER ++++++++++++++++++++++++++++++++++
  render() {

    const { contacts, filter } = this.state;
    // console.log("state render: ", this.state); //!
    // console.log("contacts render: ", contacts); //!
    //  console.log("contactInputId: ", this.contactInputId); //!


    const visibleContacts = this.getVisibleContacts();
    // console.log("visibleContacts: ", visibleContacts); //!

    const totalContacts = contacts.length;



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1000} />

        <h1>Phonebook</h1>

        <ContactForm
          // contacts={contacts}
          onSubmit={this.formSubmitHandler}
        />

        {/* <form
          className="Form"
          onSubmit={this.handleSubmit}>

          <label htmlFor={this.contactInputId}>
            Name
            <br />
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleChange}
              id={this.contactInputId}
            />
          </label>
          <br />

          <label htmlFor={this.contactInputId}>
            Number
            <br />
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleChange}
              id={this.contactInputId}
            />
          </label>
          <br />

          <button type="submit">
            Add contact
          </button>
        </form> */}

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

        <Filter
          value={filter}
          onChange={this.changeFilter}
        />
          
          {/* <label>
            Find contacts by name
            <br />
          <input
            type="text"
            value={filter}
            onChange={this.changeFilter} />
          </label> */}
        
        <ContactList
          visibleContacts={visibleContacts}
          onDeleteTodo={this.deleteTodo}
        />
        
          {/* <ul>
            {visibleContacts.map(({ id, name, number }) => (
              <li key={id}>
                <p>{name}: {number}</p>
              </li>
            ))}
          </ul> */}

      </Container>
    );
  }
}

// export default App;



//! old --------------------------------------------
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };