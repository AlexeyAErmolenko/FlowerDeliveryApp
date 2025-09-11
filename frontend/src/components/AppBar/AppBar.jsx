import Navigation from '../Navigation/Navigation';
import ButtonsSortBy from '../ButtonsSortBy/ButtonsSortBy';

import css from './AppBar.module.css';

export default function AppBar() {
    return (
        <header className={css.header}>
            <Navigation />
            <ButtonsSortBy />
        </header>
    );
}