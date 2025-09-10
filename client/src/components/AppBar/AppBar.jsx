import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Navigation from '../Navigation/Navigation';
import ButtonsSortBy from '../ButtonsSortBy/ButtonsSortBy';

import { selectIsSorting } from '../../redux/contacts/selectors';

import css from './AppBar.module.css';

export default function AppBar() {
    const isSorting = useSelector(selectIsSorting);
    return (
        <header className={css.header}>
            <Navigation />
            {isSorting && <ButtonsSortBy />}
            <Toaster position="top-center" reverseOrder={false} />
        </header>
    );
}