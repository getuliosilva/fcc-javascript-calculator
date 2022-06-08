import { useState } from 'react'
import Button from './Button'
import { buttonArray } from './buttonArray'
import './global.css'

function App() {
  const [screenContent, setScreenContent] = useState('0')
  const [showResult, setShowResult] = useState(false)

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

    processInput(keyObj)
  }

  function processInput(keyObj){
    if(showResult === true){
      if(typeOfChar(keyObj.label) === 'number'){
        setScreenContent('')
      }
      setShowResult(false)
    }
    if(typeOfChar(keyObj.label) === 'number'){
      if(screenContent === '0'){ //calculator in initial state
        if(keyObj.label !== '0'){
          setScreenContent(keyObj.label)
        }
      }
      else if(keyObj.label === '0'){
        if(typeOfChar(screenContent[screenContent.length - 1]) === 'operation'){ //0 after operation
          setScreenContent(prev => prev + keyObj.label)
        }
        else if(typeOfChar(screenContent[screenContent.length - 2]) === 'operation' && screenContent[screenContent.length - 1] !== '0'){ //0 after operation and non-zero number
          setScreenContent(prev => prev + keyObj.label)
        }
        else if(typeOfChar(screenContent[screenContent.length - 2]) !== 'operation'){ //0 after any number
          setScreenContent(prev => prev + keyObj.label)
        }
      }
      else if(typeOfChar(screenContent[screenContent.length - 2]) === 'operation' && screenContent[screenContent.length - 1] !== '0'){ //no number after 0
        setScreenContent(prev => prev + keyObj.label)
      }
      else if(typeOfChar(screenContent[screenContent.length - 2]) !== 'operation'){ //any number after any non-zero number
        setScreenContent(prev => prev + keyObj.label)
      }
    }

    else if(typeOfChar(keyObj.label) === 'operation'){
      if(typeOfChar(screenContent[screenContent.length - 1]) !== 'operation'){ //append operation to number
        setScreenContent(prev => prev + keyObj.label)
      }
      else{ // -- or overwrite operation
        if(screenContent[screenContent.length - 1] === '-'){
          if(typeOfChar(screenContent[screenContent.length - 2]) !== 'operation'){
            if(keyObj.label === '-'){ //--
              setScreenContent(prev => prev + keyObj.label)
            }
            else{ //overwrite -
              setScreenContent(prev => {
                let prevCopy = prev.slice(0, -1)
                return prevCopy + keyObj.label
              })
            }
          }
          else{
            if(keyObj.label !== '-'){ //--
              setScreenContent(prev => {
                let prevCopy = prev.slice(0, -2)
                return prevCopy + keyObj.label
              })
            }
          }
        }
        else if(keyObj.label === '-'){
          setScreenContent(prev => prev + keyObj.label)
        }
        else{ //overwrite operation different than -
          setScreenContent(prev => {
            let prevCopy = prev.slice(0, -1)
            return prevCopy + keyObj.label
          })
        }
      }
    }

    else{
      if(keyObj.label === 'C'){
        setScreenContent('0')
      }

      else if(keyObj.label === '.'){
        let hasDecimal = false

        for(let i = screenContent.length - 1; i >= 0; i--){
          if(typeOfChar(screenContent[i]) === 'operation'){
            break
          }
          if(screenContent[i] === '.'){
            hasDecimal = true
            break
          }
        }
        
        if(hasDecimal === false){
          setScreenContent(prev => prev + keyObj.label)
        }
      }

      else if(keyObj.label === '='){
        const lastScreenContent = screenContent.slice()
        const clearExpression = clearScreenEnd(lastScreenContent)
        const readyExpression = treatDoubleMinus(clearExpression)
        const floatExpression = expressionToFloat(readyExpression)
        // eslint-disable-next-line
        setScreenContent(eval(floatExpression))
        setShowResult(true)
      }
    }
  }

  function typeOfChar(char){
    switch(char){
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return 'number'
      case '+':
      case '-':
      case '*':
      case '/':
        return 'operation'
      default:
        return 'other'
    }
  }

  function clearScreenEnd(expression){
    while(typeOfChar(expression[expression.length - 1]) !== 'number'){
      expression = expression.slice(0, -1)
    }
    return expression
  }

  function treatDoubleMinus(expression){
    let pos = 0

    while(pos < expression.length - 2){
      //if(expression[pos] === '-' && expression[pos + 1] === '-'){
      if(typeOfChar(expression[pos]) === 'operation' && expression[pos + 1] === '-'){  
        let openParenthesis = pos + 1
        let closeParenthesis = openParenthesis + 1

        while(typeOfChar(expression[closeParenthesis]) === 'number' && closeParenthesis < expression.length){
          closeParenthesis++
        }

        let firstHalf = expression.slice(0, openParenthesis)
        let secondHalf = expression.slice(openParenthesis)
        expression = firstHalf + '(' + secondHalf

        firstHalf = expression.slice(0, closeParenthesis + 1)
        secondHalf = expression.slice(closeParenthesis + 1)
        expression = firstHalf + ')' + secondHalf
      }
      pos++
    }
    return expression
  }

  function expressionToFloat(expression){
    let pos = 0
    let isFloat = false

    while(pos < expression.length){
      if(expression[pos] === '.'){
        isFloat = true
      }
      if(typeOfChar(expression[pos]) === 'operation' || pos === expression.length){
        if(isFloat === false){
          let firstHalf = expression.slice(0, pos)
          let secondHalf = expression.slice(pos)
          expression = firstHalf + '.0' + secondHalf
          pos += 2
        }
        isFloat = false
      }
      pos++
    }
    return expression
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
  )
}

export default App;
