import './Picross.css';
import {useState, useEffect, useCallback, useMemo} from "react";
import {NewGameWindow, HelpWindow} from './SettingsBox';
import { initialColNums, initialRowNums, crossNumbers } from './utils';
import CalcPopup from './CalcPopup';

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
  const [markHistory, setMarkHistory] = useState([])
  const hypotheticals = markHistory && markHistory.length > 0 && 
    markHistory.map(e => e[0]).filter(e => e)
  const [markerMode, setMarkerMode] = useState(false)

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
        setMarkHistory([])
      } else {
        setMarkHistory([[]])
      }
      return !prev
    })
  }, [width, height])

  const pushScenario = useCallback(() => {
    if (markerMode && markHistory.length > 0 && markHistory[markHistory.length - 1].length > 0) {
      setMarkHistory(prev => [...prev, []])
    }
  }, [markerMode, markHistory])

  const popScenario = useCallback(() => {
    if (markerMode && markHistory.length > 0 && markHistory[markHistory.length - 1].length > 0) {
      const last = markHistory[markHistory.length - 1]
      setMarks(prev => prev.map((e, i) => last.includes(i) ? false : e))
      setMarkHistory(prev => prev.length === 1 ? [[]] : prev.slice(0, -1))
    }
  }, [markerMode, markHistory])

  useEffect(() => {
    function handleKeyUp(event) {
      if (event.key === 'c') {
        setCalcPopup(prev => !prev)
        setXDown(false)
        setZDown(false)
      } else if (event.key === 'u' || event.key === 'v') {
        undo()
      } else if (event.key === 'h')  {
        setSettings(prev => prev === "help" ? false : "help")
      } else if (event.key === 'm') {
        toggleMarkerMode()
      } else if (event.key === 'p') {
        pushScenario()
      } else if (event.key === 'o') {
        popScenario()
      } else if (event.key === 'Escape') {
        setSettings(false)
      } else if (event.key === 'n') {
        setSettings(prev => {
          if (prev === "new") {
            newGame(height, width)
            resetValues(height, width)
            return false
          }
          return "new"
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
  }, [undo, newGame, height, width, toggleMarkerMode, pushScenario, popScenario])

  useEffect(() => {
    localStorage.setItem("picrossGame", JSON.stringify({moveHistory, board, squareSize}))
  }, [board, moveHistory, squareSize])


  const clickOnSquare = useCallback((square, right=false) => {
    if (!clicks[square] && !marks[square]) {
      let trueMode = right ? (mode === 'gray' ? 'blue' : 'gray') : mode
      if (markerMode) {
        setMarks(prev => [...prev.slice(0, square), trueMode, ...prev.slice(square + 1)])
        setMarkHistory(prev => {
          return [...prev.slice(0, -1), [...prev[prev.length - 1], square]]
        })
         
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

  function resetValues(newHeight, newWidth) {
    setBluesClicked(0)
    setMistakes(0)
    setHeight(newHeight)
    setWidth(newWidth)
    setStartSquare(-1)
    setMode("blue")
    setMoveHistory([])
    setMarkHistory([])
    setRow(-1)
    setCol(-1)
    setMarkerMode(false)
  }


  function newGameButton(heightInput, widthInput, gameSave=null) {
    let ascii = gameSave ? atob(gameSave) : null
    let parsedWidth = ascii && ascii.charCodeAt(0)
    let parsedHeight = ascii && ascii.charCodeAt(1)
    const newHeight = parsedHeight ?? parseInt(heightInput)
    const newWidth = parsedWidth ?? parseInt(widthInput)
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
    if ((clicks[square] === "blue" && board[square] === 0) || 
        (clicks[square] === "gray" && board[square] === 1)) {
      return "x"
    }
    
    if (markerMode && hypotheticals?.length > 0 && hypotheticals.includes(square)) {
      return String(hypotheticals.indexOf(square) + 1)
    }

    return ""
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
  

  const buttonBox = <div className={`boxButtons left ${props.isDesktop ? "flexRow" : "flexCol"}`}>
    {!props.isDesktop && <>
      <ModeButton myMode="blue" backgroundColor="cyan"/>
      <ModeButton myMode="gray" backgroundColor="#ccc"/>  
      <ModeButton myMode="browse" backgroundColor="#0f0"/>
    </>}
    <button 
      style={{backgroundColor: "#09f"}} 
      onClick={toggleMarkerMode}
      className={markerMode ? "modeHighlighted" : ""}
    />
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
    <button onClick={zoomFitWidth}>20</button>
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
      {!settings ?
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
        <button className="newGameButton" onClick={() => setSettings("help")}>Help</button>
        <button className="newGameButton" onClick={() => setSettings("new")}>Settings</button>
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
      {calcPopup && row !== -1 && col !== -1 && <CalcPopup 
        height={height} width={width} close={() => setCalcPopup(false)}
        rowData={rowNums[row]}
        columnData={colNums[col]}
      />}
      <div className='acknowledgement'>
        <p>Heavily inspired by <a href="http://liouh.com/picross/">Henry Liou.</a></p>
        <p><a href="https://github.com/bengordon-dev/personal-website/blob/master/website/src/pages/Picross.js">Source Code</a></p>
      </div>

      
      </>
      : settings === "help" ? <HelpWindow close={() => setSettings(false)}/>
      : <NewGameWindow height={height} width={width} newGameButton={newGameButton} board={board} close={() => setSettings(false)}/>
      }
    </div>
  );
}

export default Picross;
