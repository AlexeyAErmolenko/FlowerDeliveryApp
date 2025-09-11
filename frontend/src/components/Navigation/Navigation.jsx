import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
    return (
        <nav className={css.nav}>
            <NavLink className={css.link} to="/">Shop</NavLink> |            
            <NavLink className={css.link} to="/cart">Shopping Cart</NavLink>
        </nav>
    );
};