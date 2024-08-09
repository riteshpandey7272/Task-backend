import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

const Autowriter = () => {
  const handleType = (count) => {
    console.log(count)
  }
  
  const handleDone = () => {
    console.log('Done after 5 loops!')
  }

  return (
    <div className='App'>
      <h1 style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal', textAlign: 'center' }}>
        Life is simple{' '}
        <span style={{ color: 'red', fontWeight: 'bold' }}>
          <Typewriter
            words={['Eat', 'Sleep', 'Repeat!']}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={handleDone}
            onType={handleType}
          />
        </span>
      </h1>
    </div>
  )
}

export default Autowriter
