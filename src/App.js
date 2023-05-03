import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleIncreaseByOne = () => {
    setCount((prev) => prev + 1);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <form onSubmit={handleFormSubmit}>
        <h1 className='form-title mb-2 text-2xl font-bold text-center'>
          Simple counter form
        </h1>
        <h2 className='form-counter mb-2 text-lg font-bold text-center'>
          {`Current counter ${count}`}
        </h2>
        <input
          type='button'
          value='Counter++'
          className='bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2'
          onClick={handleIncreaseByOne}
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 font-bold rounded-md m-2'
          onClick={handleIncreaseByOne}
        >
          Counter [+1]
        </button>
      </form>
    </div>
  );
}

export default App;
