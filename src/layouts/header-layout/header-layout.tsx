import { Outlet } from 'react-router-dom';
import { Basket } from '../../components';
import style from './header-layout.module.css';
import clsx from 'clsx';

interface HeaderLayoutProps {
    contentPosition?: 'center' | 'right'; // left is default
}
export const HeaderLayout = ({contentPosition}: HeaderLayoutProps) => {
    return <>
        <div  className={clsx(
            style.subheader,
            {
                [style.contentCenter]: contentPosition === 'center',
                [style.contentRight]: contentPosition === 'right',
            }
        )}>
        <Basket />
        </div>
        <Outlet />
    </>
}
