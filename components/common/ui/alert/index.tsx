import { CrossSmall } from "components/icons";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface NotificationProps {
  toastList?: any;
  position?: string;
  autoDelete?: boolean;
  autoDeleteTime?: number;
}

interface AlertProps {
  id?: string;
  backgroundColor?: string;
  title?: string;
  description?: string;
}

const Notification = (props: NotificationProps): JSX.Element => {
  const { toastList, position, autoDelete, autoDeleteTime } = props;
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list]);

  const deleteToast = (id: string | number) => {
    const listItemIndex = list?.findIndex((e: any) => e.id === id);
    const toastListItem = toastList?.findIndex((e: any) => e.id === id);
    list?.splice(listItemIndex, 1);
    toastList?.splice(toastListItem, 1);
    setList([...list]);
  };
  const [alertContainer, setAlertContainer] = useState<any>("");
  useEffect(() => {
    const div = document.getElementById("portal");
    div && setAlertContainer(div);
  }, []);

  return alertContainer
    ? ReactDOM.createPortal(
        <div className={`notification-container ${position}`}>
          {list &&
            list.length > 0 &&
            list.map((toast: AlertProps, index: number) => (
              <div
                key={index}
                className={`notification toast ${position}`}
                style={{ backgroundColor: toast?.backgroundColor }}
              >
                <div className="close-btn">
                  <button>
                    <CrossSmall
                      color="#fff"
                      onClick={() => deleteToast(toast?.id)}
                    />
                  </button>
                </div>
                <div>
                  <p className="notification-title">{toast?.title}</p>
                  <p className="notification-message">{toast?.description}</p>
                </div>
              </div>
            ))}
        </div>,
        alertContainer
      )
    : null;
};

export default Notification;
