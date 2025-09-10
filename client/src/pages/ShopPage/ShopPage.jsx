import css from './ShopPage.module.css';
export default function ShopPage() {
    return (
        <div className={css.container}>
            <title>Shop</title>
            <div>
                <h2>Зліва список магазинів</h2>
                <h2>Справа сiтка товарів</h2>                
            </div>
        </div>
    );
}