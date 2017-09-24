import React from 'react';

import 'scss/framework/notification.scss';


const NotificationIndicator = () => {
  return (
    <div className="NotificationIndicator">
      <svg width="100%" height="100%" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="200" fill="white" />
      </svg>
    </div>
  );
};

module.exports = { NotificationIndicator };
