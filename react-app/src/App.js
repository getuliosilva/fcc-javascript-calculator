import { useState } from 'react'
import Button from './Button'
import './global.css'

function App() {
  const [screenContent, setScreenContent] = useState('')
  const [currentNumber, setCurrentNumber] = useState('')

  const buttonArray = [
    [
      {
        id: 'seven',
        label: '7',
        width: 1
      },
      {
        id: 'eight',
        label: '8',
        width: 1
      },
      {
        id: 'nine',
        label: '9',
        width: 1
      },
      {
        id: 'add',
        label: '+',
        width: 1
      }
    ],
    [
      {
        id: 'four',
        label: '4',
        width: 1
      },
      {
        id: 'five',
        label: '5',
        width: 1
      },
      {
        id: 'six',
        label: '6',
        width: 1
      },
      {
        id: 'subtract',
        label: '-',
        width: 1
      }
    ],
    [
      {
        id: 'one',
        label: '1',
        width: 1
      },
      {
        id: 'two',
        label: '2',
        width: 1
      },
      {
        id: 'three',
        label: '3',
        width: 1
      },
      {
        id: 'multiply',
        label: 'X',
        width: 1
      }
    ],
    [
      {
        id: 'zero',
        label: '0',
        width: 1
      },
      {
        id: 'decimal',
        label: '.',
        width: 1
      },
      {
        id: 'equals',
        label: '=',
        width: 1
      },
      {
        id: 'divide',
        label: '/',
        width: 1
      }
    ],
    [
      {
        id: 'clear',
        label: 'C',
        width: 2
      },
      {
        id: 'erase',
        label: 'E',
        width: 2
      }
    ]
  ]

  const keypad = buttonArray.map( element => {
    const buttonRow = element.map( innerObject => {
      return <Button 
          key={innerObject.id}
          id={innerObject.id}
          label={innerObject.label}
          width={innerObject.width}
          handleKeyPress={()=>handleKeyPress(innerObject.id)}
        />
    })
    return <div className='button-row'>{buttonRow}</div>
  })

  function handleKeyPress(id){
    let keyObj = null

    for(let array of buttonArray){
      for(let obj of array){
        if(obj.id === id){
          keyObj = obj
        }
      }
    }

    console.log(keyObj)

    switch(id){
      case 'clear':
        setScreenContent('')
        setCurrentNumber('')
        break
      case 'erase'://INCOMPLETE(prev number)
        if(screenContent !== ''){
          setCurrentNumber(prev => prev.slice(0, -1))
          setScreenContent(prev => prev.slice(0, -1))
        }
        break
      case 'decimal':
        if(!currentNumber.includes('.') && currentNumber !== ''){
          setCurrentNumber(prev => prev + '.')
          setScreenContent(prev => prev + '.')
        }
        break
      case 'add':
        if(currentNumber !== ''){
          setCurrentNumber('')
          setScreenContent(prev => prev + '+')
        }
      break
      case 'subtract':
        if(currentNumber !== ''){
          setCurrentNumber('')
          setScreenContent(prev => prev + '-')
        }
      break
      case 'multiply':
        if(currentNumber !== ''){
          setCurrentNumber('')
          setScreenContent(prev => prev + 'x')
        }
      break
      case 'divide':
        if(currentNumber !== ''){
          setCurrentNumber('')
          setScreenContent(prev => prev + '/')
        }
      break
      case 'zero':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '0')
          setScreenContent(prev => prev + '0')
        }
        break
      case 'one':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '1')
          setScreenContent(prev => prev + '1')
        }
        break
      case 'two':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '2')
          setScreenContent(prev => prev + '2')
        }
        break
      case 'three':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '3')
          setScreenContent(prev => prev + '3')
        }
        break
      case 'four':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '4')
          setScreenContent(prev => prev + '4')
        }
       break
      case 'five':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '5')
          setScreenContent(prev => prev + '5')
        }
        break
      case 'six':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '6')
          setScreenContent(prev => prev + '6')
        }
        break
      case 'seven':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '7')
          setScreenContent(prev => prev + '7')
        }
        break
      case 'eight':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '8')
          setScreenContent(prev => prev + '8')
        }
        break
      case 'nine':
        if(currentNumber !== '0'){
          setCurrentNumber(prev => prev + '9')
          setScreenContent(prev => prev + '9')
        }
        break
      default:
        console.log('DEFAULT')
        break
    }
  }

  return (
    <div className='App'>
      <h2 id='title'>
        JS-Calc
      </h2>
      <div id='display'>
        {screenContent}
      </div>
      <div id='keypad'>
        {keypad}
      </div>
    </div>
  );
}

export default App;
