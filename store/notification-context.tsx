import {
  createContext,
  Context,
  ReactNode,
  FC,
  useState,
  useEffect
} from 'react';

import { NotificationContextInt, Notification } from '../@types/notification';

interface Props {
  children: ReactNode;
}

const NotificationContext = createContext<NotificationContextInt>({
  notification: null,
  showNotification: (notificationData: Notification) => {},
  hideNotification: () => {}
});

export const NotificationContextProvider: FC<Props> = ({ children }) => {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: Notification) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context: NotificationContextInt = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
