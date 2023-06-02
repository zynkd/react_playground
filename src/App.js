import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import Alert from './components/Alert';
import { alertMessages } from './alertMessages';
import { alertTypes } from './alertTypes';

const API_URL = 'https://api.sampleapis.com/csscolornames/colors';
const DEFAULT_BACKGROUND_COLOR = '#3B82F6';

function App() {
  const [colorListFromServer, setColorListFromServer] = useState(null);

  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [customIncrement, setCustomIncrement] = useState('');

  const [color, setColor] = useState(DEFAULT_BACKGROUND_COLOR);
  const [textColor, setTextColor] = useState('');

  const [errorMessageCustomIncrement, setErrorMessageCustomIncrement] =
  useState('');
  // const hasErrorsCustomIncrement =
  //   errorMessageCustomIncrement === '' ? false : true;
  const hasErrorsCustomIncrement = Boolean(errorMessageCustomIncrement);

  // Errors when trying type or submit a new color
  const [hasErrorTextColor, setHasErrorTextColor] = useState(false);
  const [hasErrorSubmitColor, setHasErrorSubmitColor] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((result) => result.json())
      .then((data) => setColorListFromServer(data));
  }, []);

  const displayTempErrorMessage = (errorSetter, timer) => {
    errorSetter(true);

    setTimeout(() => errorSetter(false), timer);
  };

  // Handlers for Counter
  const handleCounterIncreaseButton = () => {
    setCount((prev) => prev + increment);
  };

  const handleCounterResetButton = () => {
    setCount(0);
    setIncrement(1);
    setCustomIncrement('');
    setColor(DEFAULT_BACKGROUND_COLOR);
  };

  // Handlers for Increments
  const handleIncrementTextInput = (e) => {
    const typedInput = e.target.value;
    setCustomIncrement(typedInput);

    if (typedInput === '') {
      setErrorMessageCustomIncrement('');
    } else if (isNaN(typedInput)) {
      setErrorMessageCustomIncrement('This is not a number');
    } else if (typedInput % 1 !== 0) {
      setErrorMessageCustomIncrement('Decimal places are not allowed');
    } else if (typedInput < 1 || typedInput > 100) {
      setErrorMessageCustomIncrement('Numbers must be between 1 and 100');
    } else {
      setErrorMessageCustomIncrement('');
    }
  };

  const handleIncrementSubmit = () => {
    if (!hasErrorsCustomIncrement && customIncrement !== '') {
      setIncrement(+customIncrement);
    }

    setCustomIncrement('');
  };

  const handleIncrementSelect = (e) => {
    setIncrement(+e.target.value);
  };

  // Handlers for Colors

  const handleColorSelect = (e) => {
    setColor(e.target.value);
  };

  const handleColorTextInput = (e) => {
    const typedInput = e.target.value;
    setTextColor(typedInput);

    if (typedInput === '' || /^[A-Za-z\s]+$/.test(typedInput)) {
      setHasErrorTextColor(false);
    } else {
      setHasErrorTextColor(true);
    }
  };

  const handleColorSubmit = () => {
    const foundColor = colorListFromServer.find(
      (item) => item.name === textColor,
    );

    setTextColor('');

    foundColor
      ? setColor(foundColor.hex)
      : displayTempErrorMessage(setHasErrorSubmitColor, 3500);
  };

  // Handler for Form

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  function handleOnMouseEnter(event) {
    event.target.style.backgroundImage = 'linear-gradient(rgb(0 0 0/30%) 0 0)';
    event.target.style.fontWeight = '700';
  }

  function handleOnMouseLeave(event) {
    event.target.style.background = color;
  }

  return (
    <div className='max-w-[540px] mx-auto px-2'>
      <main className='h-screen flex flex-col items-center justify-center text-center'>
        <form
          className='px-4 py-8 pb-2 sm:px-16 lg:px-24 lg:py-10 lg:pb-6 border-0 sm:border-8 md:border-8'
          onSubmit={handleFormSubmit}
        >
          <section>
            <h1 className='form-title mb-4 text-3xl font-bold'>
              Zbynek's Counter
            </h1>
          </section>

          {/* Counter tracker */}
          <section className='mb-12'>
            <h2 className='mb-1 text-lg font-bold'>{`Counter: ${count}`}</h2>
            <div className='flex justify-center mb-6'>
              <button
                type='button'
                className='text-sm text-white px-4 py-2 rounded-md m-2'
                style={{ backgroundColor: color || DEFAULT_BACKGROUND_COLOR }}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleCounterIncreaseButton}
              >
                Increase +{increment}
              </button>
              <button
                type='button'
                className='text-sm text-white px-4 py-2 rounded-md m-2'
                style={{ backgroundColor: color || DEFAULT_BACKGROUND_COLOR }}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleCounterResetButton}
              >
                Reset
              </button>
            </div>
          </section>

          {/* Custom Increment */}
          <section>
            <h2 className='mb-3 text-lg font-bold'>
              {`Increment: ${increment}`}
            </h2>
            <div className='flex justify-center items-center gap-3 mb-3'>
              <p>Select:</p>
              <div className='flex gap-1 justify-center'>
                {[1, 2, 3, 4, 5].map((number) => (
                  <button
                    type='button'
                    key={number}
                    value={number}
                    className='text-sm text-white w-10 h-10 rounded-full'
                    style={{
                      backgroundColor: color || DEFAULT_BACKGROUND_COLOR,
                    }}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={handleIncrementSelect}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
            <div className='flex justify-center items-center gap-3'>
              <p>Choose custom: </p>
              <input
                type='text'
                className='bg-gray-200 px-3 py-1 outline-none w-16'
                placeholder='1-100'
                name='choose-custom-increment'
                id='id-choose-custom-increment'
                value={customIncrement}
                onChange={handleIncrementTextInput}
              />
              <input
                type='button'
                value='Apply'
                className={cn(
                  'text-white',
                  'px-4',
                  'py-2',
                  'rounded-md',
                  'text-sm',
                  'hover:bg-blue-600',
                  {
                    'opacity-50': hasErrorsCustomIncrement,
                    'cursor-not-allowed': hasErrorsCustomIncrement,
                    'hover:bg-blue-500': hasErrorsCustomIncrement,
                  },
                )}
                style={{ backgroundColor: color || DEFAULT_BACKGROUND_COLOR }}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleIncrementSubmit}
                disabled={hasErrorsCustomIncrement}
              />
            </div>

            {/* {hasErrorsCustomIncrement && (
              <div className='mt-3 bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-2 w-[300px] text-center flex mx-auto justify-center'>
                {errorMessageCustomIncrement}
              </div>
            )} */}
            <Alert
              isActive={hasErrorsCustomIncrement}
              alertText={errorMessageCustomIncrement}
              alertType={alertTypes.Warning}
            />
          </section>

          {/* Color theme */}
          <section>
            <h2 className='mb-3 text-lg font-bold'>{`Choose Color Theme`}</h2>
            <label htmlFor='id-select-counter-color'>{`Select theme: `}</label>
            <select
              value={color}
              onChange={handleColorSelect}
              id='id-select-counter-color'
              className='outline-none mb-4 w-40'
            >
              <option value=''>Choose color</option>
              <option value='#795548'>Brown</option>
              <option value='#fb8c00'>Orange</option>
              <option value='#388e3c'>Green</option>
              <option value='#5e35b1'>Purple</option>
              <option value='#c62828'>Red</option>
            </select>
            <div className='flex justify-center gap-3 text-sm'>
              <input
                type='text'
                name='input-text-1'
                placeholder='Add custom color...'
                className='bg-gray-200 px-3 py-2 w-40 outline-none'
                value={textColor}
                onChange={handleColorTextInput}
              />
              <input
                type='button'
                value='Update Color'
                className={cn(
                  'text-white',
                  'px-4',
                  'py-2',
                  'rounded-md',
                  'text-sm',
                  'hover:bg-blue-600',
                  {
                    'opacity-50': hasErrorSubmitColor || hasErrorTextColor,
                    'cursor-not-allowed':
                      hasErrorSubmitColor || hasErrorTextColor,
                    'hover:bg-blue-500':
                      hasErrorSubmitColor || hasErrorTextColor,
                  },
                )}
                style={{ backgroundColor: color || DEFAULT_BACKGROUND_COLOR }}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleColorSubmit}
                disabled={hasErrorSubmitColor || hasErrorTextColor}
              />
            </div>

            {/* <Alert
              isActive={hasErrorSubmitColor}
              alertText={alertMessages.ColorNotFound}
              alertType={alertTypes.Warning}
            /> */}

            <Alert
              isActive={hasErrorTextColor}
              alertText={alertMessages.ColorOnlyAlphabeticalChars}
              alertType={alertTypes.Warning}
            />
          </section>
        </form>
      </main>
    </div>
  );
}

export default App;
