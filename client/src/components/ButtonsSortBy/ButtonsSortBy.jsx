import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logOut } from '../../redux/auth/operations';
// import { selectUser } from '../../redux/auth/selectors';
import css from './ButtonsSortBy.module.css';

export default function ButtonsSortBy() {
    const dispatch = useDispatch();
    // const user = useSelector(selectUser);

    const onClick = () => {
        dispatch(logOut())
        // .unwrap()
        .then(() => { toast.success('Sorted success!'); })
        .catch(() => { toast.error('Sorted error!'); });
    };

    return (
        <div className={css.wrapper}>
            <button type="button" className={css.btnLogout} onClick={onClick}>
                Sort by price
            </button>
            <button type="button" className={css.btnLogout} onClick={onClick}>
                Sort by date
            </button>  
        </div>
    );
};