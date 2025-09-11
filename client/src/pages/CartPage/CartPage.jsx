import Cart from "../../components/Cart/Cart";

import css from './CartPage.module.css';

export default function CartPage() {   

    return (
        <div className={css.container}>
            <title>Shopping Cart</title>         
            <Cart />
        </div>
    );
}