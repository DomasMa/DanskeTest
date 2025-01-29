import clsx from 'clsx';
import styles from './notification-box.module.css';

interface NotificationBoxProps {
    id: number;
    offsetLeft?: number;
    notificationWidth?: number;
}

export const NotificationBox = ({id, offsetLeft, notificationWidth}: NotificationBoxProps) => {
    return <div className={clsx(styles.notificationBox)} style={{
        '--left-offset': `${offsetLeft}px`,
        '--notification-width': `${notificationWidth}px`
    } as React.CSSProperties}>
        order item No. {id}
    </div>
}
