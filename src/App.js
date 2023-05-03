import React, { useState } from 'react';
import cn from 'classnames';

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('');

  const handleIncreaseByOne = () => {
    setCount((prev) => prev + 1);
  };

  const handleIncreaseBy100 = () => {
    setCount((prev) => prev + 100);
  };

  const handleColorSelect = (event) => {
    setColor(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <form onSubmit={handleFormSubmit}>
        <h1 className='form-title mb-2 text-2xl font-bold text-center'>
          Simple counter form
        </h1>
        <h2 className='form-counter mb-2 text-lg font-bold text-center'>
          {/* Current counter:{' '}
          <span
            style={{
              color: color,
            }}
          >
            {count}
          </span> */}
          Current counter:{' '}
          <span
            className={cn({
              'text-red-500': color === 'red',
              'text-green-500': color === 'green',
              'text-blue-500': color === 'blue',
              'text-purple-500': color === 'purple',
            })}
          >
            {count}
          </span>
        </h2>
        <div className='flex justify-around'>
          <input
            type='button'
            value='Counter+1'
            className='bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2'
            onClick={handleIncreaseByOne}
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2'
            onClick={handleIncreaseByOne}
          >
            Counter [+1]
          </button>
        </div>
        <div className='flex justify-around mb-3'>
          <input
            type='button'
            value='Counter+100'
            className='bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2'
            onClick={handleIncreaseBy100}
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2'
            onClick={handleIncreaseBy100}
          >
            Counter [+100]
          </button>
        </div>

        <div className='flex justify-center gap-4'>
          <p className='mb-1 text-center'>Counter color:</p>
          <select value={color} onChange={handleColorSelect}>
            <option value=''>Choose color</option>
            <option value='red'>Red</option>
            <option value='green'>Green</option>
            <option value='blue'>Blue</option>
            <option value='purple'>Purple</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default App;
