import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/Loader/Loader";
import ContactList from '../../components/ContactList/ContactList';

import { fetchAll } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';

import css from './CartPage.module.css';

export default function CartPage() {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchAll()); }, [dispatch]);

    const isLoading = useSelector(selectLoading);
    const isError = useSelector(selectError);    

    return (
        <div className={css.container}>
            <title>Shopping Cart</title>
            { isLoading && <Loader />}
            {isError && <p>Error...</p>}
            Shopping Cart
            <ContactList />
        </div>
    );
}