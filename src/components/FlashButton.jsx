import { useState, useEffect } from 'react';
import Button from '../components/Button';

const FlashButton = (WrappedComponent) => {
  const FlashButtonComponent = ({ text, color, ...props }) => {
    const [shouldFlash, setShouldFlash] = useState(false);

    useEffect(() => {
      setShouldFlash(true);

      const timer = setTimeout(() => {
        setShouldFlash(false);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }, [text]);

    const styleOverwrite = shouldFlash && {
      backgroundColor: color,
      animation: 'flash-animation 150ms linear infinite',
    };

    return (
      <WrappedComponent
        text={text}
        color={color}
        styleOverwrite={styleOverwrite}
        {...props}
      />
    );
  };

  return FlashButtonComponent;
};

export default FlashButton(Button);
