import css from './ShopPage.module.css';
import ShopList from "../../components/ShopList/ShopList";
import SKUList from "../../components/SKUList/SKUList";

export default function ShopPage() {
    return (
        <div >
            <title>Shop</title>
            <div className={css.container}>
                <ShopList />
                <div className={css.mainBlock}>
                    <SKUList />
                </div>
            </div>
        </div>
    );
}