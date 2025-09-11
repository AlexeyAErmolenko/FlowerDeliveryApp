import css from './Loader.module.css';
import { BounceLoader } from "react-spinners";

export default function Loader() {
    return ( < BounceLoader size={40} className={css.loader} /> );
}