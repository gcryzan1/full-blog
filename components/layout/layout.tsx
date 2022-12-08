import { ReactNode, useContext } from 'react';

import MainNavigation from './main-navigation';
import NoficationContext from '../../store/notification-context';
import Notification from '../ui/notification';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const notificationCtx = useContext(NoficationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status!}
        />
      )}
    </>
  );
};

export default Layout;
