import Contact from "../Contact/Contact.jsx";
import css from './ContactList.module.css';

import { useSelector } from "react-redux";
import { selectCurrentContacts } from "../../redux/contacts/selectors";

export default function ContactList() {
  const currentContacts = useSelector(selectCurrentContacts);
  return (
    <div className={css.container}>
      <ul className={css.list}>
          {currentContacts.map(contact => (
            <li key={contact.id} className={css.item}>
              <Contact id={contact.id} name={contact.name} number={contact.number} />
            </li>
          ))}
      </ul>
    </div>
  )
}