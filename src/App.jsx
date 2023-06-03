import React, { useState, useEffect } from 'react';
import './App.css';
import { DEFAULT_BACKGROUND_COLOR } from './constants';
import { API_URL } from './constants';

import Alert from './components/Alert';
import { alertMessages } from './alertMessages';
import { alertTypes } from './alertTypes';
import Button from './components/Button';
import InputButton from './components/InputButton';
import FlashButton from './components/FlashButton';

function App() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [color, setColor] = useState(DEFAULT_BACKGROUND_COLOR);

  const [typedColor, setTypedColor] = useState('');
  const [typedIncrement, setTypedIncrement] = useState('');

  const [errorMessageIncrement, setErrorMessageIncrement] = useState('');
  const [errorMessageColor, setErrorMessageColor] = useState('');
  const hasErrorIncrement = Boolean(errorMessageIncrement);
  const hasErrorColor = Boolean(errorMessageColor);

  const [colorsFromServer, setColorsFromServer] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((result) => result.json())
      .then((data) => setColorsFromServer(data));
  }, []);

  // Handlers for Counter
  const handleCounterIncreaseButton = () => {
    setCount((prev) => prev + increment);
  };

  const handleCounterReset = () => {
    setCount(0);
    setIncrement(1);
    setTypedIncrement('');
    setColor(DEFAULT_BACKGROUND_COLOR);
  };

  // Handlers for Increments
  const handleIncrementSelect = (e) => {
    setIncrement(Number(e.target.value));
  };

  const handleIncrementTextInput = (e) => {
    const typedInput = e.target.value;
    setTypedIncrement(typedInput);

    if (typedInput === '') {
      setErrorMessageIncrement('');
    } else if (isNaN(typedInput)) {
      setErrorMessageIncrement(alertMessages.IncrementNotANumber);
    } else if (typedInput % 1 !== 0) {
      setErrorMessageIncrement(alertMessages.IncrementNotDecimals);
    } else if (typedInput < 1 || typedInput > 100) {
      setErrorMessageIncrement(alertMessages.IncrementOutsideRange);
    } else {
      setErrorMessageIncrement('');
    }
  };

  const handleIncrementSubmit = () => {
    if (!hasErrorIncrement && typedIncrement !== '') {
      setIncrement(Number(typedIncrement));
    }

    setTypedIncrement('');
  };

  // Handlers for Colors
  const handleColorSelect = (e) => {
    setColor(e.target.value);
  };

  const handleColorTextInput = (e) => {
    const typedInput = e.target.value;
    setTypedColor(typedInput);

    if (typedInput === '') {
      setErrorMessageColor('');
    } else if (!/^[A-Za-z\s]+$/.test(typedInput)) {
      setErrorMessageColor(alertMessages.ColorOnlyAlphabeticalChars);
    } else if (typedInput.length > 19) {
      setErrorMessageColor(alertMessages.ColorTextTooLong);
    } else {
      setErrorMessageColor('');
    }
  };

  const handleColorSubmit = () => {
    const foundColor = colorsFromServer.find(
      (item) => item.name === typedColor.toLowerCase(),
    );

    foundColor
      ? setColor(foundColor.hex)
      : setErrorMessageColor(alertMessages.ColorNotFound);

    setTypedColor('');

    setTimeout(() => {
      setErrorMessageColor('');
    }, 3000);
  };

  // Handler for Form
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='max-w-[540px] mx-auto px-2'>
      <main className='h-screen flex flex-col items-center justify-center text-center'>
        <form
          className='zynk-form px-4 py-8 pb-2 sm:px-20 lg:px-24 lg:py-10 lg:pb-6 border-0 sm:border-8 md:border-8'
          onSubmit={handleFormSubmit}
        >
          <section>
            <h1 className='form-title mb-4 text-3xl font-bold'>
              Zbynek's Counter
            </h1>
          </section>

          {/* Counter tracker */}
          <section className='mb-8 pb-8 relative'>
            <h2 className='mb-1 text-lg font-bold'>{`Counter: ${count}`}</h2>

            <div className='flex justify-center'>
              <FlashButton
                text={`Increase +${increment}`}
                color={color}
                click={handleCounterIncreaseButton}
              />

              <Button text='Reset' color={color} click={handleCounterReset} />
            </div>

            <hr className='absolute bottom-0 left-1/2 -translate-x-1/2 min-w-[340px] border-2' />
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
                  <Button
                    key={`roundedIncrementButton-${number}`}
                    text={number}
                    color={color}
                    click={handleIncrementSelect}
                    value={number}
                    shape='rounded'
                  />
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
                value={typedIncrement}
                onChange={handleIncrementTextInput}
              />

              <InputButton
                text='Apply'
                color={color}
                click={handleIncrementSubmit}
                isDisabled={hasErrorIncrement}
              />
            </div>

            <Alert
              isActive={hasErrorIncrement}
              alertText={errorMessageIncrement}
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
                value={typedColor}
                onChange={handleColorTextInput}
              />

              <InputButton
                text='Update Color'
                color={color}
                click={handleColorSubmit}
                isDisabled={hasErrorColor}
              />
            </div>

            <Alert
              isActive={hasErrorColor}
              alertText={errorMessageColor}
              alertType={alertTypes.Warning}
            />
          </section>
        </form>
      </main>
    </div>
  );
}

export default App;
