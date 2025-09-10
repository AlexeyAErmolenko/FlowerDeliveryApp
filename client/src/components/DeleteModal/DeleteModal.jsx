import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
// import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import css from './DeleteModal.module.css';
import { selectIsOpenModalWindow } from '../../redux/contacts/selectors';
import { toggleModalWindow } from '../../redux/contacts/slice';
import { selectCurrentIdContact } from "../../redux/contacts/selectors";
import { setCurrentIdContact } from "../../redux/contacts/slice";

export default function DeleteModal({ id }) {
  console.log("🚀 ~ DeleteModal ~ id:", id)  
  const isOpenModalWindow = useSelector(selectIsOpenModalWindow);
  const dispatch = useDispatch();
  const currentIdContact = useSelector(selectCurrentIdContact);
  const handleDelete = () => {
    dispatch(toggleModalWindow());
    dispatch(deleteContact(currentIdContact))
    dispatch(setCurrentIdContact(null))
    .unwrap()
    .then(() => { toast.success('DeleteContact success!'); })
    .catch(() => { toast.error('DeleteContact error!'); });
  };

  return (
    <>
      <Dialog open={isOpenModalWindow} onClose={() => dispatch(toggleModalWindow())} className={css.dialog}>
        <div className={css.dialogBox}>
          <DialogPanel className={css.modalBox}>
            <DialogTitle className={css.boldText}>Delete contact?</DialogTitle>
            <Description>Are you sure you want to delete the contact?</Description>
            <div className={css.flex}>
              <button onClick={() => dispatch(toggleModalWindow())}>Cancel</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}