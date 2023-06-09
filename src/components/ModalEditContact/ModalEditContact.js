import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { changeContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { IoMdClose } from 'react-icons/io';
import css from './ModalEditContact.module.css';

const ModalEditContact = ({ setActive, id }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const user = contacts.find(item => item.id === id);

  const [nameValue, setNameValue] = useState(user.name);
  const [numberValue, setNumberValue] = useState(user.number);

  const handleChangeInputName = ({ target: { value } }) => {
    setNameValue(value);
  };
  const handleChangeInputNumber = ({ target: { value } }) => {
    setNumberValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contact = {
      id,
      name: nameValue,
      number: numberValue,
    };

    dispatch(changeContact(contact));
    reset();
    setActive(false);
  };

  const reset = () => {
    setNameValue('');
    setNumberValue('');
  };

  return (
    <div className={css.modal}>
      <div className={css.modal__content}>
        <div
          className={css.form__closeBtn}
          type="button"
          onClick={() => {
            setActive(false);
          }}
        >
          <IoMdClose size={20} />
        </div>

        <h3 className={css.modal__title}>Edit Contact</h3>
        <form className={css.form} onSubmit={handleSubmit}>
          <label className={css.form__label}>
            Name:
            <input
              className={css.form__input}
              type="text"
              name="name"
              placeholder="input name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={nameValue}
              onChange={handleChangeInputName}
            />
          </label>
          <label className={css.form__label}>
            Phone:
            <input
              className={css.form__input}
              type="tel"
              name="number"
              placeholder="input number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={numberValue}
              onChange={handleChangeInputNumber}
            />
          </label>
          <button className={css.form__btn} type="submit">
            Edit Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditContact;

ModalEditContact.propTypes = {
  id: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};
