import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
// import { deleteCart } from '../../redux/cart/operations';
import toast from 'react-hot-toast';
import css from './DeleteModal.module.css';
// import { selectIsOpenModalWindow } from '../../redux/cart/selectors';
// import { toggleModalWindow } from '../../redux/cart/slice';
// import { selectCurrentIdCart } from "../../redux/cart/selectors";
// import { setCurrentIdCart } from "../../redux/carts/slice";

export default function DeleteModal({ id }) { 
  // const isOpenModalWindow = useSelector(selectIsOpenModalWindow);
  const dispatch = useDispatch();
  // const currentIdCart = useSelector(selectCurrentIdCart);
  // const handleDelete = () => {
  //   dispatch(toggleModalWindow());
  //   dispatch(deleteCart(currentIdCart))
  //   dispatch(setCurrentIdCart(null))
  //   .unwrap()
  //   .then(() => { toast.success('DeleteCart success!'); })
  //   .catch(() => { toast.error('DeleteCart error!'); });
  // };

  return (
    <>
      {/* <Dialog open={isOpenModalWindow} onClose={() => dispatch(toggleModalWindow())} className={css.dialog}>
        <div className={css.dialogBox}>
          <DialogPanel className={css.modalBox}>
            <DialogTitle className={css.boldText}>Delete item?</DialogTitle>
            <Description>Are you sure you want to delete the item?</Description>
            <div className={css.flex}>
              <button onClick={() => dispatch(toggleModalWindow())}>Cancel</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog> */}
    </>
  )
}