import { DEFAULT_BACKGROUND_COLOR } from '../constants';

const Button = ({ text, color, click, value, shape, styleOverwrite }) => {
  const roundedButtonStyle = 'w-10 h-10 rounded-full';
  const standardButtonStyle = 'px-4 py-2 rounded-md m-2';

  return (
    <button
      type='button'
      className={`text-sm text-white ${
        shape === 'rounded' ? roundedButtonStyle : standardButtonStyle
      }`}
      style={styleOverwrite ? styleOverwrite : { backgroundColor: color || DEFAULT_BACKGROUND_COLOR }}
      onClick={click}
      {...(value && { value })}
    >
      {text}
    </button>
  );
};

export default Button;
