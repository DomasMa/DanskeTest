import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BiBasket} from 'react-icons/bi';
import {EventName, Notification} from '../../models';
import {useEventSubscribe} from '../../hooks';
import {NotificationBox} from './notification-box';
import styles from './basket.module.css';


interface BasketProps {
    basketSize: number;
    margin: number;
    notificationWidth: number;
}
export const Basket: React.FC<BasketProps> = ({basketSize,margin,notificationWidth  }) => {
    const [notification, setNotification] = useState<Notification>();
    const basketRef = useRef<HTMLDivElement>(null);

    const [offsetLeft, setOffsetLeft] = useState<number>(0);

    const calculateOffset = useCallback((): number => {
        if (!basketRef.current) return 0;

        const basketRect = basketRef.current.getBoundingClientRect();
        const viewportWidth = document.documentElement.clientWidth;

        if (viewportWidth < 480) {
            return margin;
        }

        const spaceOnRight = viewportWidth - basketRect.right;
        let preferredOffset = 0;

        if (spaceOnRight < notificationWidth) {
            preferredOffset = basketRect.width - notificationWidth;
        }

        const minOffset = margin - basketRect.left;
        const maxOffset = viewportWidth - margin - basketRect.left - notificationWidth;

        return Math.max(minOffset, Math.min(preferredOffset, maxOffset));
    }, [margin, notificationWidth]);

    const handleAddBasketItem = ({id}: Notification) => {
        setOffsetLeft(calculateOffset());
        setNotification({id});
    };

    useEffect(() => {
        if (!notification) {
            return;
        }
        const handleResize = () => {
            setOffsetLeft(calculateOffset());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
