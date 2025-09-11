import css from './Layout.module.css';
import { Toaster } from 'react-hot-toast';
import AppBar from '../AppBar/AppBar';

const Layout = ({ children }) => {
    return (
        <div className={css.container}>
            <AppBar />
            {children}
            <Toaster position='top-center' reverseOrder={false} />
        </div>
    );
};
export default Layout;