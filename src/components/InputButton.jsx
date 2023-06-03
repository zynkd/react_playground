import React from 'react';
import cn from 'classnames';
import {DEFAULT_BACKGROUND_COLOR} from '../constants';

const InputButton = ({ text, color, click, isDisabled }) => {
  return (
    <input
      type='button'
      className={cn(
        'text-white',
        'px-4',
        'py-2',
        'rounded-md',
        'text-sm',
        'hover:bg-blue-600',
        {
          'opacity-50': isDisabled,
          'cursor-not-allowed': isDisabled,
          'hover:bg-blue-500': isDisabled,
        },
      )}
      style={{ backgroundColor: color || DEFAULT_BACKGROUND_COLOR }}
      value={text}
      onClick={click}
      disabled={isDisabled}
    />
  );
};

export default React.memo(InputButton);
