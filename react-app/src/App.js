import './global.css'

function App() {
  return (
    <div className='App'>
      <h2 id='title'>
        JS-Calc
      </h2>
      <div id='display'>
        0
      </div>
      <div id='keypad'>
        <div className='button-row'>
          <button id='seven' className='button-w1'>
            7
          </button>
          <button id='eight' className='button-w1'>
            8
          </button>
          <button id='nine' className='button-w1'>
            9
          </button>
          <button id='add' className='button-w1'>
            +
          </button>
        </div>
        <div className='button-row'>
          <button id='four' className='button-w1'>
            4
          </button>
          <button id='five' className='button-w1'>
            5
          </button>
          <button id='six' className='button-w1'>
            6
          </button>
          <button id='subtract' className='button-w1'>
            -
          </button>
        </div>
        <div className='button-row'>
          <button id='one' className='button-w1'>
            1
          </button>
          <button id='two' className='button-w1'>
            2
          </button>
          <button id='three' className='button-w1'>
            3
          </button>
          <button id='multiply' className='button-w1'>
            X
          </button>
        </div>
        <div className='button-row'>
          <button id='zero' className='button-w1'>
            0
          </button>
          <button id='decimal' className='button-w1'>
            .
          </button>
          <button id='equals' className='button-w1'>
            =
          </button>
          <button id='divide' className='button-w1'>
            /
          </button>
        </div>
        <div className='button-row'>
          <button id='clear' className='button-w2'>
            C
          </button>
          <button id='erase' className='button-w2'>
            E
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default App;
