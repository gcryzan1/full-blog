import { FormEventHandler, useContext, useState } from 'react';

import NotificationContext from '../../store/notification-context';
import classes from './contact-form.module.css';

const ContactForm = () => {
  const notificationCtx = useContext(NotificationContext);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  const sendMessageHandler: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    notificationCtx.showNotification({
      message: 'Your message is currently being send.',
      status: 'pending',
      title: 'Sending your Message...'
    });

    const newMessage = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage
    };
    const body = JSON.stringify(newMessage);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        notificationCtx.showNotification({
          message: 'Your message was sent successfully.',
          status: 'success',
          title: 'Success!'
        });
        setEnteredEmail('');
        setEnteredMessage('');
        setEnteredName('');
      } else {
        const responseData = await response.json();

        notificationCtx.showNotification({
          message: responseData.message
            ? responseData.message
            : 'Sending message failed.',
          status: 'error',
          title: 'Failure'
        });
      }
    } catch (error: any) {
      notificationCtx.showNotification({
        message: error.message ? error.message : 'Sending message failed.',
        status: 'pending',
        title: 'Failure'
      });
    }
  };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(ev) => setEnteredEmail(ev.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(ev) => setEnteredName(ev.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            name='message'
            id='message'
            required
            rows={5}
            value={enteredMessage}
            onChange={(ev) => setEnteredMessage(ev.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
