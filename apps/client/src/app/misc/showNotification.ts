import { NOTIFICATION_TYPE, Store } from 'react-notifications-component';


// The NOTIFICATION_TYPE enum is used to specify the type of the notification, and the Store object is used to manage the notifications.
export const showNotification = (type: NOTIFICATION_TYPE, title: string) => {
  Store.addNotification({
    title,
    type,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: false,
    },
  });
};


// this component is used to display a notification that is used to display a notification using the react library 

// To use this function, you would call showNotification() with the desired type and title parameters. For example:

// --------------------------------------------------------------------
// showNotification(NOTIFICATION_TYPE.SUCCESS, 'Success notification');
// --------------------------------------------------------------------


// This would display a success notification with the title "Success notification" using the configured settings in the showNotification function.

