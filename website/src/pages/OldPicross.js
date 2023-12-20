import './Picross.css';
import {useState, useEffect} from "react";

function Picross(props) {
  const [board, setBoard] = useState([])
  const [clicks, setClicks] = useState([])
  const [mode, setMode] = useState("blue") // browse, blue, gray
  const [squareSize, setSquareSize] = useState(20)
  const [row, setRow] = useState(-1)
  const [col, setCol] = useState(-1)
  const [rowNums, setRowNums] = useState([])
  const [colNums, setColNums] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [settings, setSettings] = useState(false)
  const [heightInput, setHeightInput] = useState(15)
  const [widthInput, setWidthInput] = useState(15)
  const [height, setHeight] = useState(15)
  const [width, setWidth] = useState(15)
  const [blues, setBlues] = useState(1)
  const [bluesClicked, setBluesClicked] = useState(0)
  const [calcPopup, setCalcPopup] = useState(false)
  const [rowCrossouts, setRowCrossouts] = useState(null)
  const [colCrossouts, setColCrossouts] = useState(null)
  const [lastMove, setLastMove] = useState(null)

  const rowSum = row >= 0 && rowNums[row].reduce((a, b) => a + b, 0) + rowNums[row].length
  const colSum = col >= 0 && colNums[col].reduce((a, b) => a + b, 0) + colNums[col].length

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    setSquareSize(document.getElementById('mainBox').clientWidth/15)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--boxSize', `${squareSize}px`);
    document.documentElement.style.setProperty('--width', width);
    document.documentElement.style.setProperty('--height', height);
  }, [squareSize, width, height])

  useEffect(() => {
    if (!settings) {
      let colNums = document.getElementById('colNumbers')
      let mainBox = document.getElementById('mainBox')
      mainBox.onscroll = () => {
        colNums.scrollLeft = mainBox.scrollLeft
      }
    }

  }, [settings])

  function newGame() {
    //setSquareSize(20)
    const newHeight = parseInt(heightInput)
    const newWidth = parseInt(widthInput)


    let newBoard = []
    let newClicks = []
    let blueCount = 0
    for (let i = 0; i < newHeight*newWidth; i++) {
      let num = Math.floor(Math.random()*2)
      blueCount += num
      newBoard.push(num)
      newClicks.push(false)
    }
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
    setBoard(newBoard)
    setClicks(newClicks)
    setRowNums(newRowNums)
    setColNums(newColNums)
    setRowCrossouts([...newRowNums.map(e => [-1, e.length])])
    setColCrossouts([...newColNums.map(e => [-1, e.length])])
    setHeight(newHeight)
    setWidth(newWidth)
    setBlues(blueCount)
    setBluesClicked(0)
    setMistakes(0)
  }


  function borderClasses(square) {
    return `${square % width < width - 1 ? ((square % width) % 5 === 4 ? " cellRightEdge" : " notRightEdge") : ""}${square < (width*height) - width ? (Math.floor(square/width) % 5 === 4 ? " cellBottomEdge" : " notBottomEdge") : ""}`
  }

  function click(square) {
    if (calcPopup) return;
    setRow(Math.floor(square / width))
    setCol(square % width)
    const rows = document.getElementById('rowNumbers')
    rows.scrollTop = rows.scrollHeight * Math.max(0, Math.floor(square / width) - 2) / height;
    let colNums = document.getElementById('colNumbers')
    let mainBox = document.getElementById('mainBox')
    colNums.scrollLeft = mainBox.scrollLeft
    if (mode !== "browse" && !clicks[square]) {
      setLastMove({square, mode})
      setClicks(prev => {
        const newClicks = [...prev.slice(0, square), mode, ...prev.slice(square + 1)]
        updateCrossouts(square, newClicks)
        return newClicks
      })
      if ((mode === "gray" && board[square] === 1) || (mode === "blue" && board[square] === 0)) {
        setMistakes(prev => prev + 1)
      }
      if (board[square] === 1) {
        setBluesClicked(prev => prev + 1)
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

  function updateCrossouts(square, newClicks) {
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
    if (!clicks[square]) return focused ? " focused" : highlighted ?  " highlighted" : ""
    let color = board[square] === 1 ? " blue" : " gray"
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
    const boxWidth = document.getElementById('mainBox').clientWidth/width
    setSquareSize(boxWidth)
  }

  function undo() {
    if (lastMove) {
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
      setLastMove(null)
    }
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
  
  const buttonBox = <div className={`boxButtons left ${props.isDesktop ? "flexRow" : "flexCol"} centerCenter`}>
    <ModeButton myMode="blue" backgroundColor="cyan"/>
    <ModeButton myMode="gray" backgroundColor="#ccc"/>
    <ModeButton myMode="browse" backgroundColor="#0f0"/>
    {col >= 0 && row >= 0 && <button 
      style={{backgroundColor: "#faa"}} 
      className='flexCol centerCenter'
      onClick={() => setCalcPopup(true)}
      >
        🔢
    </button>}
    {lastMove && <button
      style={{backgroundColor: "#ffa"}}
      className='flexCol centerCenter'
      onClick={() => undo()}
      >
        ↩️
    </button>}
  </div>

  const rowNumbers = <div id="rowNumbers" className="rowNumbers flexCol">
    {rowNums && rowNums.map((e, i) => <div onClick={() => rowClick(i)} key={i} className={`flexRow ${row === i ? "highlighted" : ""}`}>
      {e.length === 0 ? "None" : e.map((num, j) => <p key={j} className={`groupNum${j <= rowCrossouts[i][0] || j >= rowCrossouts[i][1] ? " crossedOut" : ""}`}>&nbsp;{num}&nbsp;</p>)}
    </div>)}
  </div>

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
        <p onClick={() => setSettings(true)}>Settings</p>
        <button onClick={newGame}>New Game</button>
      </div>
      <div id="boxCols" className='flexCol'>
        <div id="colNumbers">
          {colNums && colNums.map((e, i) => <div key={i} onClick={() => clickColumn(i)}
            className={`flexCol numberCol ${col === i ? "highlighted" : ""}`}>
            {e.map((num, j) => <p className={`groupNum${j <= colCrossouts[i][0] || j >= colCrossouts[i][1] ? " crossedOut" : ""}`} key={j}>{num}</p>)}
          </div>)}
        </div>
        <div className="center flexRow">
          {!props.isDesktop && buttonBox}
          {props.isDesktop && rowNumbers}
          <div id="mainBox">
            {board.length === width*height && [...Array(width*height).keys()].map((e) => <div 
              key={e} 
              className={`item centerCenter${borderClasses(e)}${colorClass(e)}`}
              onClick={() => click(e)}
            >{squareText(e)}</div>
              )}
          
          </div>
          <div className="boxButtons right flexCol centerCenter">
            <button onClick={zoomIn}>+</button>
            <button onClick={zoomOut}>-</button>
            <button onClick={zoomFitWidth}>W</button>
          </div>
        </div>
      </div>
      {props.isDesktop && buttonBox}
      {!props.isDesktop && rowNumbers}
      {calcPopup && <CalcPopup/>}
      <div className='acknowledgement'>
        <p>Heavily inspired by Henry Liou. Play <a href="http://liouh.com/picross/">his version</a> instead if on a computer!</p>
        <p><a href="https://github.com/bengordon-dev/personal-website/blob/master/website/src/pages/Picross.js">Source Code</a></p>
      </div>

      
      </>
      : <div className='settings flexCol'>
        <input id="heightInput" type="text" placeholder='height' value={heightInput} onChange={(e) => setHeightInput(e.target.value)}/>
        <input id="widthInput" type="text" placeholder='width' value={widthInput} onChange={(e) => setWidthInput(e.target.value)}/>
        <p><b>A note on the 3 modes</b><br/>
          The blue mode allows one to mark blue squares, i.e. the squares denoted by the numbers.<br/>
          The gray mode allows one to mark gray squares, which simply denote the absence of blue squares.<br/>
          The green mode denotes "browsing" mode, where one can tap on any square with no consequence.
        </p>
        <button onClick={() => setSettings(false)}>Close window</button>
      </div>}
    </div>
  );
}

export default Picross;
