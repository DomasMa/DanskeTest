import { Outlet } from 'react-router-dom';
import { Basket } from '../../components';
import style from './header-layout.module.css';

export const HeaderLayout = () => {
    return <>
        <div className={style.subheader}>
            <Basket basketSize={25} margin={10} notificationWidth={400} />
        </div>
        <Outlet />
    </>
}
