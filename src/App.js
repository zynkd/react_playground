import React, { useState, useEffect } from 'react';
import cn from 'classnames';

const API_URL = 'https://api.sampleapis.com/csscolornames/colors';

function App() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [customIncrement, setCustomIncrement] = useState('');
  const [color, setColor] = useState('');
  const [textIncrement, setTextIncrement] = useState('');
  const [textColor, setTextColor] = useState('');
  const [dataFromServer, setDataFromServer] = useState(null);

  // Errors when choosing custom counter increment
  const [hasErrorsCustomIncrement, setHasErrorsCustomIncrement] =
    useState(false);
  const [errorMessageCustomIncrement, setErrorMessageCustomIncrement] =
    useState('');

  // Errors when trying type or submit a new color
  const [hasErrorTextColor, setHasErrorTextColor] = useState(false);
  const [hasErrorSubmitColor, setHasErrorSubmitColor] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((result) => result.json())
      .then((data) => setDataFromServer(data));
  }, []);

  // Make error message appear for only a couple of seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasErrorSubmitColor(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasErrorSubmitColor]);

  const handleTextColor = (e) => {
    const typedInput = e.target.value;
    setTextColor(typedInput);

    if (typedInput === '' || /^[A-Za-z\s]+$/.test(typedInput)) {
      setHasErrorTextColor(false);
    } else {
      setHasErrorTextColor(true);
    }
  };

  const handleSubmitColor = () => {
    const foundColor = dataFromServer.find((item) => item.name === textColor);

    setTextColor('');

    foundColor
      ? setColor(foundColor.hex)
      : setHasErrorSubmitColor(true);
  };

  const handleSelectIncrement = (e) => {
    setIncrement(+e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickIncreaseByIncrement = () => {
    setCount((prev) => prev + increment);
  };

  const handleResetCounter = () => {
    setCount(0);
    setIncrement(1);
    setCustomIncrement('');
    setColor('');
    setTextIncrement('');
    setHasErrorsCustomIncrement(false);
  };

  const handleSelectColor = (e) => {
    setColor(e.target.value);
  };

  const handleTextCustomIncrement = (e) => {
    // Calling `setState` doesn't immediately update the state object -> won't be
    // able to see the new change immediately after calling setState ...
    // Solution 1 - storing input in another variable (and test-validate that)
    // Solution 2 - move the logic into the callback function that will be
    // only called AFTER the state updates ...
    const typedInput = e.target.value;
    setCustomIncrement(typedInput);

    if (typedInput === '') {
      setHasErrorsCustomIncrement(false);
    } else if (isNaN(typedInput)) {
      setErrorMessageCustomIncrement('This is not a number');
      setHasErrorsCustomIncrement(true);
      // Only integers allowed
    } else if (typedInput % 1 !== 0) {
      setErrorMessageCustomIncrement('Decimal places are not allowed');
      setHasErrorsCustomIncrement(true);
    } else if (typedInput < 1 || typedInput > 100) {
      setErrorMessageCustomIncrement('Numbers must be between 1 and 100');
      setHasErrorsCustomIncrement(true);
    } else {
      setHasErrorsCustomIncrement(false);
    }
  };

  const handleSubmitCustomIncrement = () => {
    if (hasErrorsCustomIncrement === false && customIncrement !== '') {
      setIncrement(+customIncrement);
    }

    setCustomIncrement('');
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <form
      className='border-4 p-12'
        onSubmit={handleFormSubmit}
      >
        <h1 className='form-title mb-4 text-3xl font-bold'>
          Zynk's React Counter
        </h1>

        <div className='text-center text-md mb-6'>
          <h2
            className='mb-1 text-lg font-bold'
            style={{
              color: color,
            }}
          >
            {`Counter: ${count}`}
          </h2>
          <div className='flex justify-center mb-4'>
            <button
              className='text-sm bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2 hover:bg-blue-700'
              onClick={handleClickIncreaseByIncrement}
              type='button'
            >
              Increase +{increment}
            </button>
            <button
              className='text-sm bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2 hover:bg-blue-700'
              onClick={handleResetCounter}
              type='button'
            >
              Reset
            </button>
          </div>
        </div>

        <div className='text-center text-md mb-6'>
          <h2 className='mb-3 text-lg font-bold'>
            {`Increment: ${increment}`}
          </h2>

          <div className='flex justify-center items-center gap-3 mb-3'>
            <p>Select:</p>
            <div className='flex gap-1 justify-center'>
              {[1, 2, 3, 4, 5].map((number) => (
                <button
                  type='button'
                  onClick={handleSelectIncrement}
                  key={number}
                  value={number}
                  className='text-sm bg-blue-500 text-white w-10 h-10 rounded-full hover:bg-blue-700 hover:font-bold'
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div className='flex justify-center items-center gap-3 mb-2'>
            <p>Choose custom: </p>
            <input
              type='text'
              className='bg-blue-100 px-3 py-1 outline-none w-16'
              placeholder='1-100'
              name='choose-custom-increment'
              id='id-choose-custom-increment'
              value={customIncrement}
              onChange={handleTextCustomIncrement}
            />
            <input
              type='button'
              value='Apply'
              className={cn(
                'bg-blue-500',
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
              onClick={handleSubmitCustomIncrement}
              disabled={hasErrorsCustomIncrement}
            />
          </div>
          {hasErrorsCustomIncrement && (
            <div className='mt-3 bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-2 w-[300px] text-center flex mx-auto justify-center'>
              {errorMessageCustomIncrement}
            </div>
          )}
        </div>

        <div className='text-center text-md'>
          <h2 className='mb-3 text-lg font-bold'>{`Color theme: `}</h2>

          <label htmlFor='id-select-counter-color'>{`Select theme: `}</label>

          <select
            value={color}
            onChange={handleSelectColor}
            id='id-select-counter-color'
            className='outline-none mb-4'
          >
            <option value=''>Choose color</option>
            <option value='#f44336'>Red</option>
            <option value='#ff9800'>Orange</option>
            <option value='#388e3c'>Green</option>
            <option value='#1565c0'>Blue</option>
            <option value='#5e35b1'>Purple</option>
          </select>

          <div className='flex justify-center gap-3 text-sm'>
            <input
              type='text'
              name='input-text-1'
              placeholder='Add custom color...'
              className='bg-blue-100 px-3 py-2 w-40 outline-none'
              value={textColor}
              onChange={handleTextColor}
            />
            <input
              type='button'
              value='Update Color'
              // className='bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600'
              className={cn(
                'bg-blue-500',
                'text-white',
                'px-4',
                'py-2',
                'rounded-md',
                'text-sm',
                'hover:bg-blue-600',
                {
                  'opacity-50': hasErrorSubmitColor,
                  'cursor-not-allowed': hasErrorSubmitColor,
                  'hover:bg-blue-500': hasErrorSubmitColor,
                },
              )}
              onClick={handleSubmitColor}
              disabled={hasErrorSubmitColor}
            />
          </div>

          {hasErrorSubmitColor && (
            <div className='mt-3 bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-3 w-[320px] text-left flex mx-auto justify-center'>
              The given color was not found in our database. Try different one!
            </div>
          )}

          {hasErrorTextColor && (
            <div className='mt-3 bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-3 w-[320px] text-left flex mx-auto justify-center'>
              Color name must contain only alphabetical characters and spaces.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
