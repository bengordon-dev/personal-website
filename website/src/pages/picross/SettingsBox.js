import './Picross.css';
import {useState, useEffect, useMemo} from "react";

function NewGameWindow(props) {
  const [heightInput, setHeightInput] = useState(props.height ?? 15)
  const [widthInput, setWidthInput] = useState(props.width ?? 15)
  const [seedInput, setSeedInput] = useState("")
  const [gifInput, setGifInput] = useState("")
  const {newGameButton, board, height, width} = props

  useEffect(() => {
    const savedGifURL = getComputedStyle(document.documentElement).getPropertyValue('--win-gif')
      .split("url(")[1].split(")")[0]
    setGifInput(savedGifURL)
  }, [])

  function saveGifInput() {
    document.documentElement.style.setProperty('--win-gif', `url(${gifInput})`);
    localStorage.setItem("picrossWinGif", gifInput)
  }

  function resetWinGif() {
    document.documentElement.style.setProperty('--win-gif', `url(https://i.pinimg.com/originals/e6/f8/0b/e6f80be8122d7019c37b39b02dd6ec2c.gif)`);
    localStorage.removeItem("picrossWinGif")
  }


  const base64Board = useMemo(() => {
    if (!board.length) {
      return ""
    }
    let raw = String.fromCharCode(width, height)
    for (let i = 0; i < board.length; i += 8) {
      let bytearray = board.slice(i, Math.min(board.length, i + 8))
      let sum = 0
      for (let j = bytearray.length; j > 0; j--) {
        sum += bytearray[j - 1] * (1 << (bytearray.length - j))
      }
      raw += String.fromCharCode(sum)
    }
    return btoa(raw)

  }, [board, height, width])

  const seedGameSave = seedInput.length > 0 ? seedInput : null

  return (
    <div className='settings flexCol'>
      <div className='flexRow'>
        <label>Height</label>
        <input id="heightInput" type="text" placeholder='height' value={heightInput} onChange={(e) => setHeightInput(e.target.value)}/>
      </div>
      <div>
      </div>
      <div className='flexRow' style={{marginBottom: "1em"}}>
        <label>Width</label>
        <input id="widthInput" type="text" placeholder='width' value={widthInput} onChange={(e) => setWidthInput(e.target.value)}/>
      </div>
      <p id="boardSeed">{base64Board}</p>
      <div className='flexRow centerCenter' style={{marginBottom: "1em"}}>
        <label>Board seed input</label>
        <input value={seedInput} onChange={(e) => setSeedInput(e.target.value)} style={{marginRight: "1em"}}/>
        <button className="newGameButton" onClick={() => newGameButton(heightInput, widthInput, seedGameSave)}>New Game</button>
      </div>

      {/*<div className='flexRow centerCenter'>
        <label>Win GIF url</label>
        <input value={gifInput} onChange={(e) => setGifInput(e.target.value)} style={{marginRight: "1em"}}/>
        <button className="newGameButton" onClick={saveGifInput}>Save Win GIF</button>
        <button className='newGameButton' onClick={resetWinGif}>Reset Win GIF</button>
      </div>*/}

      <button onClick={props.close} className='closeWindow'>Close window</button>
    </div>
  )
}

function HelpWindow(props) {
  return <div className='settings flexCol'>
    <p>
      <b>Mobile instructions</b><br/>
      To start the game, click the green box to enter browsing mode, then tap any square on the board.<br/>
      After tapping on a square, the row numbers will snap into place. Browsing mode is thus essential 
      to normal gameplay, though one can also tap on the row and column numbers to move the selected square.<br/>
      Click the blue box to mark blue squares, i.e. those denoted by the row and column numbers.
      Click the gray box to mark gray squares, which are simply the absence of blue squares.
    </p>

    <p>
      <b>Special features</b><br/>
      The red "calculator" button opens a popup which does some math about the row and column 
      of the selected square. It does not reveal any new information; rather, it automates 
      certain thinking which can be tedious and time-consuming on a phone.<br/>
      The yellow undo button can to be used to reverse all moves made, but the honest player will  
      find it most fun to only use it when absolutely necesssary (upon genuine misclicks.)
    </p>

    <p>
      <b>Desktop instructions</b><br/>
      One can mark squares with their mouse or with their keyboard.<br/>
      Left-clicking marks a blue square, right-clicking marks a gray square.<br/>
      Keybinds: Z: left-click (blue square), X: right-click (gray square), WASD/arrow keys: move 
      around, C: calculator, U/V: undo, -: zoom out, =: zoom in, H: help<br/>
      I find fastest to use a mix of the mouse and the keyboard. The calculator, undo, and zooming 
      shortcuts allow one to never have to leave the grid. Moving around with the keyboard is 
      more mentally taxing than moving around with the mouse, albeit very satisfying. 
    </p>

    <button onClick={props.close} className='closeWindow'>Close window</button>
  </div>
}

export {NewGameWindow, HelpWindow};
