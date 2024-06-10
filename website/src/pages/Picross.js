import './Picross.css';
import {useState, useEffect, useCallback, useMemo} from "react";

function SettingsBox(props) {
  const [heightInput, setHeightInput] = useState(props.height ?? 15)
  const [widthInput, setWidthInput] = useState(props.width ?? 15)
  const [seedInput, setSeedInput] = useState("")
  const [gifInput, setGifInput] = useState("")

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

  const {newGameButton, board, height, width} = props

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
      <p>{base64Board}</p>
      <div className='flexRow centerCenter' style={{marginBottom: "1em"}}>
        <label>Board seed input</label>
        <input value={seedInput} onChange={(e) => setSeedInput(e.target.value)} style={{marginRight: "1em"}}/>
        <button className="newGameButton" onClick={() => newGameButton(heightInput, widthInput, seedGameSave)}>New Game</button>
      </div>

      <div className='flexRow centerCenter'>
        <label>Win GIF url</label>
        <input value={gifInput} onChange={(e) => setGifInput(e.target.value)} style={{marginRight: "1em"}}/>
        <button className="newGameButton" onClick={saveGifInput}>Save Win GIF</button>
        <button className='newGameButton' onClick={resetWinGif}>Reset Win GIF</button>
      </div>
    </div>
  )
}

function Picross(props) {
  const [board, setBoard] = useState([])
  const [clicks, setClicks] = useState([])
  //const [lastMove, setLastMove] = useState(null)
  const [moveHistory, setMoveHistory] = useState([])
  const [mode, setMode] = useState("blue") // browse, blue, gray
  const [squareSize, setSquareSize] = useState(20)
  const [row, setRow] = useState(-1)
  const [col, setCol] = useState(-1)
  const [startSquare, setStartSquare] = useState(-1)
  const [rowNums, setRowNums] = useState([])
  const [colNums, setColNums] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [help, setHelp] = useState(false)
  const [settings, setSettings] = useState(false)
  const [height, setHeight] = useState(15)
  const [width, setWidth] = useState(15)
  const [blues, setBlues] = useState(1)
  const [bluesClicked, setBluesClicked] = useState(0)
  const [calcPopup, setCalcPopup] = useState(false)
  const [rowCrossouts, setRowCrossouts] = useState(null)
  const [colCrossouts, setColCrossouts] = useState(null)
  const [zDown, setZDown] = useState(false)
  const [xDown, setXDown] = useState(false)
  const [marks, setMarks] = useState([])
  const [markerMode, setMarkerMode] = useState(false)

  const rowSum = row >= 0 && rowNums.length > 0 && rowNums[row].reduce((a, b) => a + b, 0) + rowNums[row].length
  const colSum = col >= 0 && colNums.length > 0 && colNums[col].reduce((a, b) => a + b, 0) + colNums[col].length


  const updateCrossouts = useCallback((square, newClicks) => {
    const y = Math.floor(square / width)
    const x = square % width
    const col = [...Array(height).keys()].map(e => {
      const index = (e * width) + x
      return !newClicks[index] ? 0 : board[index] + 1
    })
    const row = [...Array(width).keys()].map(e => {
      const index = (y * width) + e
      return !newClicks[index] ? 0 : board[index] + 1
    })
    setColCrossouts(prev => [...prev.slice(0, x), crossNumbers(col, colNums[x].length), ...prev.slice(x + 1)])
    setRowCrossouts(prev => [...prev.slice(0, y), crossNumbers(row, rowNums[y].length), ...prev.slice(y + 1)])

  }, [board, height, width, colNums, rowNums])

  const undo = useCallback(() => {
    if (!markerMode && !calcPopup && moveHistory.length > 0) {
      const lastMove = moveHistory[moveHistory.length - 1]
      setClicks(prev => {
        const newClicks = [...prev.slice(0, lastMove.square), false, ...prev.slice(lastMove.square + 1)]
        updateCrossouts(lastMove.square, newClicks)
        return newClicks
      })
      if ((lastMove.mode === "gray" && board[lastMove.square] === 1) || (lastMove.mode === "blue" && board[lastMove.square] === 0)) {
        setMistakes(prev => prev - 1)
      }
      if (board[lastMove.square] === 1) {
        setBluesClicked(prev => prev - 1)
      }
      setRow(Math.floor(lastMove.square / width))
      setCol(lastMove.square % width)
      setMoveHistory(prev => [...prev.slice(0, -1)])
      setStartSquare(-1)
    }
  }, [board, moveHistory, updateCrossouts, width, markerMode, calcPopup])

  const newGame = useCallback((newHeight, newWidth, gameSave=null) => {
    let newBoard = []
    let newClicks = []
    let blueCount = 0
    let newMarks = []
   
    for (let i = 0; i < newHeight*newWidth; i++) {
      newMarks.push(false)
    }

    if (gameSave && (typeof gameSave === 'object')) {
      for (let i = 0; i < newHeight*newWidth; i++) {
        blueCount += gameSave.board[i]
        newClicks.push(false)
      }
      let newBluesClicked = 0
      let newMistakes = 0
      for (let i = 0; i < gameSave.moveHistory.length; i++) {
        const item = gameSave.moveHistory[i]
        newClicks[item.square] = item.mode
        if (gameSave.board[item.square] === 1) {
          newBluesClicked += 1
        }
        if ((item.mode === "gray" && gameSave.board[item.square] === 1) || (item.mode === "blue" && gameSave.board[item.square] === 0)) {
          newMistakes += 1
        } 
      }
      setBluesClicked(newBluesClicked)
      setMistakes(newMistakes)
      newBoard = gameSave.board
      setMoveHistory(gameSave.moveHistory)
    } else if (typeof gameSave === 'string') {
      let ascii = atob(gameSave)
      let byteArray = []
      for (let i = 2; i < ascii.length; i++) {
        byteArray.push(ascii.charCodeAt(i))
      }
      let boardArray = byteArray.slice(0, byteArray.length - 1)
        .flatMap(e => [...Array(8).keys()].toReversed().map(b => (e >> b) & 1))
      let lastByteLength = (newWidth * newHeight) % 8 === 0 ? 8 : (newWidth * newHeight) % 8
      let lastByte = [...Array(lastByteLength).keys()].toReversed().map(b => (byteArray[byteArray.length - 1] >> b) & 1)
      newBoard = [...boardArray, ...lastByte]
      for (let i = 0; i < newHeight * newWidth; i++) {
        blueCount += newBoard[i]
        newClicks.push(false)
      }
    } else {
      for (let i = 0; i < newHeight*newWidth; i++) {
        let num = Math.floor(Math.random()*2)
        blueCount += num
        newBoard.push(num)
        newClicks.push(false)
      }
    }
    let newRowNums = initialRowNums(newHeight, newWidth, newBoard)
    let newColNums = initialColNums(newHeight, newWidth, newBoard)
    
    
    setBoard(newBoard)
    setClicks(newClicks)
    setRowNums(newRowNums)
    setColNums(newColNums)
    setMarks(newMarks)
    let rowCrosses = [...newRowNums.map(e => [-1, e.length])]
    let colCrosses = [...newColNums.map(e => [-1, e.length])]

    if (gameSave) {
      for (let y = 0; y < newHeight; y++) {
        const row = [...Array(newWidth).keys()].map(e => {
          const index = (y * newWidth) + e
          return !newClicks[index] ? 0 : newBoard[index] + 1
        })
        rowCrosses[y] = crossNumbers(row, newRowNums[y].length)
      }

      for (let x = 0; x < newWidth; x++) {
        const col = [...Array(newHeight).keys()].map(e => {
          const index = (e * newWidth) + x
          return !newClicks[index] ? 0 : newBoard[index] + 1
        })
        colCrosses[x] = crossNumbers(col, newColNums[x].length)
      } 
    }
    setRowCrossouts(rowCrosses)
    setColCrossouts(colCrosses)
    setBlues(blueCount)
  }, [])

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const mainbox = document.getElementById('mainBox')
    let picrossInfo = null;
    let gameSave = null;
    if (localStorage.picrossWinGif) {
      document.documentElement.style.setProperty('--win-gif', `url(${localStorage.picrossWinGif})`);
    }

    if (localStorage.picrossInfo) {
      picrossInfo = JSON.parse(localStorage.picrossInfo)
    }
    if (localStorage.picrossGame) {
      gameSave = JSON.parse(localStorage.picrossGame)
    }
    if (picrossInfo) {
      setWidth(picrossInfo.width)
      setHeight(picrossInfo.height)
      if (gameSave) {
        newGame(picrossInfo.height, picrossInfo.width, gameSave)
      } else {
        newGame(picrossInfo.height, picrossInfo.width)
      }
    } else {
      newGame(15, 15)
    }
    if (mainbox) {
      if (picrossInfo) {
        if (gameSave) {
          setSquareSize(gameSave.squareSize)
        } else {
          setSquareSize(mainbox.clientWidth/picrossInfo.width)
        }
      }
      else {
        setSquareSize(mainbox.clientWidth/15)
      }
    }
  }, [newGame])

  useEffect(() => {
    document.documentElement.style.setProperty('--boxSize', `${squareSize}px`);
    document.documentElement.style.setProperty('--width', width);
    document.documentElement.style.setProperty('--height', height);
  }, [squareSize, width, height])

  const toggleMarkerMode = useCallback(() => {
    setMarkerMode(prev => {
      if (prev) {
        setMarks([...Array(width * height).keys()].map(e => false))
      }
      return !prev
    })
  }, [width, height])

  useEffect(() => {
    function handleKeyUp(event) {
      if (event.key === 'c') {
        setCalcPopup(prev => !prev)
        setXDown(false)
        setZDown(false)
      } else if (event.key === 'u' || event.key === 'v') {
        undo()
      } else if (event.key === 'h')  {
        setHelp(prev => !prev)
      } else if (event.key === 'm') {
        toggleMarkerMode()
      } else if (event.key === 'Escape') {
        setSettings(false)
      } else if (event.key === 'n') {
        setSettings(prev => {
          if (prev) {
            newGame(height, width)
            resetValues(height, width)
          }
          return !prev
        })
      } else if (event.key === '=') {
        setSquareSize(prev => prev * 1.1)
      } else if (event.key === '-') {
        setSquareSize(prev => prev / 1.1)
      } else if (event.key === 'z') {
        setZDown(false)
      } else if (event.key === 'x') {
        setXDown(false)
      }
    }
    document.onkeyup = handleKeyUp
    return () => {
      document.onkeyup = null
    } 
  }, [undo, newGame, height, width, toggleMarkerMode])

  useEffect(() => {
    localStorage.setItem("picrossGame", JSON.stringify({moveHistory, board, squareSize}))
  }, [board, moveHistory, squareSize])


  const clickOnSquare = useCallback((square, right=false) => {
    if (!clicks[square] && !marks[square]) {
      let trueMode = right ? (mode === 'gray' ? 'blue' : 'gray') : mode
      //setLastMove({square, trueMode})
      if (markerMode) {
        setMarks(prev => [...prev.slice(0, square), trueMode, ...prev.slice(square + 1)])
      } else {
        setMoveHistory(prev => [...prev, {square, mode: trueMode}])
        setClicks(prev => {
          const newClicks = [...prev.slice(0, square), trueMode, ...prev.slice(square + 1)]
          updateCrossouts(square, newClicks)
          return newClicks
        })
        if ((trueMode === "gray" && board[square] === 1) || (trueMode === "blue" && board[square] === 0)) {
          setMistakes(prev => prev + 1)
        }
        if (board[square] === 1) {
          setBluesClicked(prev => prev + 1)
        }
      }
    }
  }, [updateCrossouts, board, mode, clicks, markerMode, marks])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'w' || event.key === 'ArrowUp') {
        event.preventDefault()
        setRow(prev => Math.max(0, prev - 1))
      } else if (event.key === 'a' || event.key === 'ArrowLeft') {
        setCol(prev => Math.max(0, prev - 1))
      } else if (event.key === 's' || event.key === 'ArrowDown') {
        event.preventDefault()
        setRow(prev => Math.min(height - 1, prev + 1))
      } else if (event.key === 'd' || event.key === 'ArrowRight') {
        setCol(prev => Math.min(width - 1, prev + 1))
      } else if (!calcPopup && event.key === 'z') {
        setZDown(true)
      } else if (!calcPopup && event.key === 'x') {
        setXDown(true)
      }
    }
    document.onkeydown = handleKeyDown
    return () => {
      document.onkeydown = null
    }
  }, [width, height, calcPopup])

  useEffect(() => {
    if (zDown) {
      clickOnSquare(width * row + col, false)
    } else if (xDown) {
      clickOnSquare(width * row + col, true)
    }
  }, [clickOnSquare, zDown, xDown, col, row, width])

  useEffect(() => {
    if (!settings) {
      let colNums = document.getElementById('colNumbers')
      let rowNums = document.getElementById('rowNumbers')
      let mainBox = document.getElementById('mainBox')
      mainBox.onscroll = () => {
        colNums.scrollLeft = mainBox.scrollLeft
        if (props.isDesktop) {
          rowNums.scrollTop = mainBox.scrollTop
        }
      }
    }

  }, [settings, props.isDesktop])

  function initialRowNums(newHeight, newWidth, newBoard) {
    let newRowNums = []
    for (let i = 0; i < newHeight; i++) {
      let row = []
      let counter = 0
      for (let j = 0; j < newWidth; j++) {
        let num = newBoard.at((i * newWidth) + j)
        if (num === 0  && counter > 0) {
          row.push(counter)
          counter = 0
        } else if (num === 1) {
          counter += 1
        }
      }
      if (counter > 0) {
        row.push(counter)
      }
      newRowNums.push(row)
    }
    return newRowNums
  }

  function initialColNums(newHeight, newWidth, newBoard) {
    let newColNums = []
    for (let j = 0; j < newWidth; j++) {
      let col = []
      let counter = 0;
      for (let i = 0; i < newHeight; i++) {
        let num = newBoard.at((i * newWidth) + j)
        if (num === 0 && counter > 0) {
          col.push(counter)
          counter = 0
        } else if (num === 1) {
          counter += 1
        }
      }
      if (counter > 0) {
        col.push(counter)
      }
      newColNums.push(col)
    }
    return newColNums
  }

  function resetValues(newHeight, newWidth) {
    setBluesClicked(0)
    setMistakes(0)
    setHeight(newHeight)
    setWidth(newWidth)
    setStartSquare(-1)
    setMode("blue")
    setMoveHistory([])
    setRow(-1)
    setCol(-1)
    setMarkerMode(false)
  }


  function newGameButton(heightInput, widthInput, gameSave=null) {
    let ascii = gameSave ? atob(gameSave) : null
    let parsedWidth = ascii && ascii.charCodeAt(0)
    let parsedHeight = ascii && ascii.charCodeAt(1)
    const newHeight = parsedWidth ?? parseInt(heightInput)
    const newWidth = parsedHeight ?? parseInt(widthInput)
    newGame(newHeight, newWidth, gameSave)
    resetValues(newHeight, newWidth)
    setSettings(false)
    localStorage.setItem('picrossInfo', JSON.stringify({width: newWidth, height: newHeight}))
  }


  function borderClasses(square) {
    return `${square % width < width - 1 ? ((square % width) % 5 === 4 ? " cellRightEdge" : " notRightEdge") : ""}${square < (width*height) - width ? (Math.floor(square/width) % 5 === 4 ? " cellBottomEdge" : " notBottomEdge") : ""}`
  }


  function click(square, right=false) {
    if (calcPopup) return;
    //setRow(Math.floor(square / width))
    //setCol(square % width)
    if (!localStorage.picrossInfo) {
      localStorage.setItem('picrossInfo', JSON.stringify({width, height}))
    }
    if (!props.isDesktop) {
      const rows = document.getElementById('rowNumbers')
      rows.scrollTop = rows.scrollHeight * Math.max(0, Math.floor(square / width) - 2) / height;
    }

    let colNums = document.getElementById('colNumbers')
    let mainBox = document.getElementById('mainBox')
    colNums.scrollLeft = mainBox.scrollLeft
    if (mode === "browse") return;
    if (square === startSquare || startSquare === -1) {
      clickOnSquare(square, right)
      return
    }

    let endX = square % width;
    let endY = Math.floor(square / width);
    let startX = startSquare % width;
    let startY = Math.floor(startSquare / width);
    if (Math.abs(endX - startX) >= Math.abs(endY - startY)) { // horizontal
      let start = endX < startX ? endX : startX;
      let stop = endX < startX ? startX : endX;
      for (let j = start; j <= stop; j++) {
        clickOnSquare(width * startY + j, right);
      } 
    } else { // vertical
      let start = endY < startY ? endY : startY;
      let stop = endY < startY ? startY : endY;
      for (let i = start; i <= stop; i++) {
        clickOnSquare(width * i + startX, right);
      } 
    }
  }

  function crossNumbers(arr, groupCount) {
    let out = [-1, groupCount];
    let groupLength = 0;
    for (let i = 0; arr[i] > 0 && i < arr.length; i++) {
      if (arr[i] === 2) { // blue square
        groupLength++;
      } else { // gray square
        if (groupLength > 0) {
          out[0]++;
          groupLength = 0;
        }
      }
    }
    groupLength = 0;
    for (let i = arr.length - 1; arr[i] > 0 && i >= 0; i--) {
      if (arr[i] === 2) { // blue square
        groupLength++;
      } else { // gray square
        if (groupLength > 0) {
          out[1]--;
          groupLength = 0;
        }
      }
    }
    return out
  }

  function clickColumn(index) {
    setCol(index)
    document.getElementById('mainBox').scrollLeft = document.getElementById('colNumbers').scrollLeft
  }

  function rowClick(index) {
    setRow(index)
    //const mainbox = document.getElementById('mainBox')
    //mainbox.scrollTop = mainbox.scrollHeight*(Math.min(0, index - 12))/25
  }

  function colorClass(square) {
    if (board.length < width*height || clicks.length < width*height) return ""
    let highlighted = (col === square % width) || (row === Math.floor(square / width))
    let focused = (col === square % width) && (row === Math.floor(square / width))
    if (!clicks[square]) {
      if (marks[square]) {
        let color =  " " + marks[square]
        let shadow = focused ? " focused" : ""
        return `${color}${shadow}`
      }
      return focused || startSquare === square ? " focused" : highlighted ?  " highlighted" : ""
    } 
    let color = board[square] === 1 ? ((blues === bluesClicked && mistakes === 0) ? " winGif" :  " blue") : " gray"
    let shadow = focused ? " focused" : ""
    return `${color}${shadow}`
  }

  function squareText(square) {
    if (!clicks[square]) return ""
    if (clicks[square] === "blue" && board[square] === 1) return ""
    if (clicks[square] === "gray" && board[square] === 0) return ""
    return "x"
  }

  function zoomIn() {
    setSquareSize(prev => prev * 1.1)
  }

  function zoomOut() {
    setSquareSize(prev => prev / 1.1)
  }

  function zoomFitWidth() {
    setSquareSize(20)
  }



  const ModeButton = ({myMode, backgroundColor}) => <button 
    style={{backgroundColor}} 
    onClick={() => setMode(myMode)}
    className={mode === myMode ? "modeHighlighted" : ""}
  />

  const CalcPopup = () => <div className='flexCol centerCenter calcPopup'>
    <h5>Column sum: {colSum}</h5>
    <p>Groups of {height - colSum + 2}+ have guaranteed squares</p>
    <div className='flexRow'>{colNums[col].map(e => <div className='flexCol centerCenter' style={{marginRight: "0.75em"}}>
        <p style={e >= height - colSum + 2 ? {color: "green", fontWeight: "bold"} : {}}>{e}</p>
        <p>{Math.max(0, e - (height - colSum + 1))}</p>
      </div>
    )}</div>
    <br/>
    <h5>Row sum: {rowSum}</h5>
    <p>Groups of {width - rowSum + 2}+ have guaranteed squares</p>
    <div className='flexRow'>{rowNums[row].map(e => <div className='flexCol centerCenter' style={{marginRight: "0.75em"}}>
        <p style={e >= width - rowSum + 2 ? {color: "green", fontWeight: "bold"} : {}}>{e}</p>
        <p>{Math.max(0, e - (width - rowSum + 1)) }</p>
      </div>
    )}</div>
    <button onClick={() => setCalcPopup(false)}>Close Popup</button>
  </div>
  

  const buttonBox = <div className={`boxButtons left ${props.isDesktop ? "flexRow" : "flexCol"}`}>
    <ModeButton myMode="blue" backgroundColor="cyan"/>
    <ModeButton myMode="gray" backgroundColor="#ccc"/>
    {!props.isDesktop && <ModeButton myMode="browse" backgroundColor="#0f0"/>}
    {<button 
      style={{backgroundColor: "#09f"}} 
      onClick={toggleMarkerMode}
      className={markerMode ? "modeHighlighted" : ""}
    />}
    {col >= 0 && row >= 0 && <button 
      style={{backgroundColor: "#faa"}} 
      className='flexCol centerCenter'
      onClick={() => setCalcPopup(true)}
      >
        🔢
    </button>}
    {moveHistory.length > 0 && <button
      style={{backgroundColor: "#ffa"}}
      className='flexCol centerCenter'
      onClick={() => undo()}
      >
        ↩️
    </button>}
  </div>

  const rightButtonBox = <div className="boxButtons right flexCol">
    <button onClick={zoomIn}>+</button>
    <button onClick={zoomOut}>-</button>
    <button onClick={zoomFitWidth}>W</button>
  </div>

  const rowNumbers = <div id="rowNumbers" className="rowNumbers flexCol">
    {rowNums && rowNums.map((e, i) => <div onClick={() => rowClick(i)} key={i} className={`flexRow rowNumber ${row === i ? "highlighted" : ""}`}>
      {e.length === 0 ? "None" : e.map((num, j) => <p key={j} className={`groupNum${j <= rowCrossouts[i][0] || j >= rowCrossouts[i][1] ? " crossedOut" : ""}`}>&nbsp;{num}&nbsp;</p>)}
    </div>)}
  </div>

  function onMouseDown(square) {
    if (props.isDesktop) {
      setStartSquare(square)
    }
  }

  return (
    <div className="Picross">
      {!settings && !help ?
      <>
      <div className="topBar flexRow">
        <div className="flexCol">
          <h5>Progress</h5>
          <p>{Math.floor(bluesClicked/blues*1000)/10}%</p>
        </div>
        <div className="flexCol">
          <h5>Mistakes</h5>
          <p>{mistakes}</p>
        </div> 
        <button className="newGameButton" onClick={() => setHelp(true)}>Help</button>
        <button className="newGameButton" onClick={() => setSettings(true)}>Settings</button>
      </div>
      <div id="gameControls">
        <div id="colNumbers">
          {colNums && colNums.map((e, i) => <div key={i} onClick={() => clickColumn(i)}
            className={`flexCol numberCol ${col === i ? "highlighted" : ""}`}>
            {e.map((num, j) => <p className={`groupNum${j <= colCrossouts[i][0] || j >= colCrossouts[i][1] ? " crossedOut" : ""}`} key={j}>{num}</p>)}
          </div>)}
        </div>
        {buttonBox}
        <div id="mainBox">
          {board.length === width*height && [...Array(width*height).keys()].map((e) => <div 
            key={e} 
            className={`item centerCenter${borderClasses(e)}${colorClass(e)}`}
            onMouseUp={(event) => click(e, event.button === 2)}
            onContextMenu={(event) => {
              event.preventDefault()
              return false;
            }}
            onMouseEnter={() => {
              setRow(Math.floor(e / width))
              setCol(e % width)
            }}
            onMouseDown={() => onMouseDown(e)}
            onTouchStart={() => {
              setRow(Math.floor(e / width))
              setCol(e % width)
            }}
            onTouchEnd={() => click(e, false)}
          >{squareText(e)}</div>
            )}
        </div>
        {rightButtonBox}
        {rowNumbers}
      </div>
      {calcPopup && row !== -1 && col !== -1 && <CalcPopup/>}
      <div className='acknowledgement'>
        <p>Heavily inspired by <a href="http://liouh.com/picross/">Henry Liou.</a></p>
        <p><a href="https://github.com/bengordon-dev/personal-website/blob/master/website/src/pages/Picross.js">Source Code</a></p>
      </div>

      
      </>
      : !settings ? <div className='settings flexCol'
      >
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

        <button onClick={() => setHelp(false)} className='closeWindow'>Close window</button>
      </div>
      : <SettingsBox height={height} width={width} newGameButton={newGameButton} board={board}/>
      }
    </div>
  );
}

export default Picross;
