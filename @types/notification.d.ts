type NotificationStatus = 'pending' | 'error' | 'success' | null;

export type Notification = {
  title: string;
  message: string;
  status: NotificationStatus;
};

export interface NotificationContextInt {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: () => void;
}
