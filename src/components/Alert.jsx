import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { alertTypes } from '../alertTypes';

const Alert = ({ isActive, alertText, alertType }) => {
  return (
    <div
      style={{
        visibility: isActive ? 'visible' : 'hidden',
      }}
      className={cn(
        'flex',
        'justify-center',
        'items-center',
        'text-center',
        'mx-auto',
        'm-3',
        'py-1',
        'px-4',
        'cursor-default',
        'max-w-[250px]',
        'min-h-[56px]',
        'text-left',
        'text-sm',
        'border-l-8',
        {
          'bg-orange-100 text-orange-700 border-orange-500':
            alertType === alertTypes.Warning,
          'bg-red-100 text-red-700 border-red-500':
            alertType === alertTypes.Error,
          'bg-green-100 text-green-700 border-green-500':
            alertType === alertTypes.Notification,
        },
      )}
    >
      {alertText}
    </div>
  );
};

Alert.propTypes = {
  alertText: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default React.memo(Alert);
