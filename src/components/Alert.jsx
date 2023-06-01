import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ isActive, alertText, alertType }) => {
  return isActive && (
    <div className='mt-3 bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-3 w-[320px] text-left flex mx-auto justify-center'>
      {alertText}
    </div>
  );
};

Alert.propTypes = {
  alertText: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Alert;
