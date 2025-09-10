import css from './Contact.module.css'
import { FaUser } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import DeleteModal from '../DeleteModal/DeleteModal';
import { setCurrentIdContact } from "../../redux/contacts/slice";
import { useDispatch } from 'react-redux';
import { toggleModalWindow } from '../../redux/contacts/slice';

export default function Contact({ id, name, number }) { 
  console.log("🚀 ~ Contact ~ id:", id)
  
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setCurrentIdContact(id)); 
  }

  const handleDelete = () => {
    dispatch(toggleModalWindow());
    dispatch(setCurrentIdContact(id)); 
  } 

  return (
    <div className={css.card} id={id} >
      <div className={css.cardData}>
        <p className={css.text}><FaUser />{name}</p>
        <p className={css.text}><BsFillTelephoneFill /> {`(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8, 10)}`}</p>
      </div>
      <div className={css.groupButtons}>
        <button type='button' className={css.btnEdit} onClick={() => handleEdit()}>
          <RiEditFill size="30px" color="#fafafa" />
        </button>
        <button type='button' className={css.btnDelete} onClick={() => handleDelete()}>
          <MdDeleteForever size="30px" color="#fafafa" />
        </button>
        <DeleteModal id={id} />
      </div>
    </div>
  );
}