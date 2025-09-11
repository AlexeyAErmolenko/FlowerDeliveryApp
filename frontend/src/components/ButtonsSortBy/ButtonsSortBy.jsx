import css from './ButtonsSortBy.module.css';

export default function ButtonsSortBy() {
    const onClick = () => {
    };

    return (
        <div className={css.wrapper}>
            <button type="button" onClick={onClick}>
                Sort by price
            </button>
            <button type="button" onClick={onClick}>
                Sort by date
            </button>  
        </div>
    );
};