import React from 'react';
import InputButton from './InputButton';

const withSpinnerOverlay = (WrappedComponent) => {
  return ({ isLoading, ...props }) => {
    return (
      <div className='relative'>
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-75 rounded-md'>
            <svg
              className='animate-spin h-5 w-5 text-white'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0c-4.418 0-8 3.582-8 8h-2zm16 0a8 8 0 01-8 8v2c4.418 0 8-3.582 8-8h2zm-8-8a8 8 0 00-8 8h2a6 6 0 016-6V4zm0 16a8 8 0 008-8h-2a6 6 0 01-6 6v2z'
              ></path>
            </svg>
          </div>
        )}
        <WrappedComponent {...props} />
      </div>
    );
  };
};

const InputButtonWithSpinner = withSpinnerOverlay(InputButton);

export default React.memo(InputButtonWithSpinner);
