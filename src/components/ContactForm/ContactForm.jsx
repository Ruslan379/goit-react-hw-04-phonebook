import { useState } from 'react';
import PropTypes from 'prop-types';


import css from 'components/ContactForm/ContactForm.module.css' //todo = старый вариант импорта стилей





export const ContactForm = ({ onSubmit }) => {

  //! useState ===> name (аналог this.state.name)
  const [name, setName] = useState('');
  //! useState ===> number (аналог this.state.number)
  const [number, setNumber] = useState('');



// * +++++++++++++++++++++++++++ МЕТОДЫ ++++++++++++++++++++++++++++++++++
  //! Ввод значений в поля инпутов
  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };



  //! Очистка полей ФОРМЫ
    const reset = () => {
      setName('');
      setNumber('');
  };



  //! NEW - Submit ФОРМЫ
  const handleSubmit = event => {
    event.preventDefault();
    //! Передача значений State (name, number) в App
    onSubmit(name, number);
    reset(); 
  };



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <form
        className={css.Form}
        onSubmit={handleSubmit}
      >

        <label className={css.FormLabel}>
            Name
            <br />
            <input
              className={css.FormInput}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleChange}
            />
          </label>
          <br />

        <label className={css.FormLabel}>
            Number
            <br />
            <input
              className={css.FormInput}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={handleChange}
            />
          </label>
          <br />

        <button
          className={css.FormBtn}
          type="submit">
            Add contact
          </button>
        </form>
    );

  } 


  
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};