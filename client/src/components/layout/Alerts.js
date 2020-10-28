import React, { useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    alertContext.alerts.length > 0 && window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [alertContext.alerts.length]);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    ))
  );
};

export default Alert;
