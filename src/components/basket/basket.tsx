import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BiBasket} from 'react-icons/bi';
import {EventName, Notification} from '../../models';
import {useEventSubscribe} from '../../hooks';
import {NotificationBox} from './notification-box';
import styles from './basket.module.css';


interface BasketProps {
    basketSize: number;
}

export const Basket: React.FC<BasketProps> = ({basketSize}) => {
    const [notification, setNotification] = useState<Notification>();
    const basketRef = useRef<HTMLDivElement>(null);
    const margin = 10;
    const notificationWidth = 400;

    const [offsetLeft, setOffsetLeft] = useState<number>(0);

    const calculateOffset = useCallback((): number => {
        if (!basketRef.current) return 0;

        const basketRect = basketRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        if (viewportWidth < 480) {
            return margin;
        }

        const preferredOffset = (basketRect.width - notificationWidth) / 2;

        const minOffset = margin - basketRect.left;
        const maxOffset = viewportWidth - margin - basketRect.left - notificationWidth;

        return Math.max(minOffset, Math.min(preferredOffset, maxOffset));
    }, []);


    const handleAddBasketItem = ({id}: Notification) => {
        setOffsetLeft(calculateOffset());
        setNotification({id});
    };

    useEffect(() => {
        if (!notification) {
            return;
        }
        const recalculateOffset = () => {
            setOffsetLeft(calculateOffset());
        };

        window.addEventListener('resize', recalculateOffset);
        window.addEventListener('scroll', recalculateOffset);
        return () => {
            window.removeEventListener('resize', recalculateOffset);
            window.removeEventListener('scroll', recalculateOffset);
        }
    }, [calculateOffset, notification]);

    useEventSubscribe(EventName.addBasketItem, handleAddBasketItem);

    return (
        <div ref={basketRef} className={styles.basket}>
            <BiBasket size={basketSize} title="basket"/>
            {notification && (
                <NotificationBox
                    key={notification.id}
                    id={notification.id}
                    offsetLeft={offsetLeft}
                    notificationWidth={notificationWidth}
                />
            )}
        </div>
    );
};
