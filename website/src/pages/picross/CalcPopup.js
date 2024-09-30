import './Picross.css';

export default function CalcPopup({height, width, columnData, rowData, close}) {
  const rowSum = rowData ? rowData.reduce((a, b) => a + b, 0) + rowData.length : 0
  const colSum = columnData ? columnData.reduce((a, b) => a + b, 0) + columnData.length : 0
  return <div className='flexCol centerCenter calcPopup'>
    <h5>Column sum: {colSum}</h5>
    <p>Groups of {height - colSum + 2}+ have guaranteed squares</p>
    <div className='flexRow'>{columnData.map(e => <div key={e} className='flexCol centerCenter' style={{marginRight: "0.75em"}}>
        <p style={e >= height - colSum + 2 ? {color: "green", fontWeight: "bold"} : {}}>{e}</p>
        <p>{Math.max(0, e - (height - colSum + 1))}</p>
      </div>
    )}</div>
    <br/>
    <h5>Row sum: {rowSum}</h5>
    <p>Groups of {width - rowSum + 2}+ have guaranteed squares</p>
    <div className='flexRow'>{rowData.map(e => <div key={e} className='flexCol centerCenter' style={{marginRight: "0.75em"}}>
        <p style={e >= width - rowSum + 2 ? {color: "green", fontWeight: "bold"} : {}}>{e}</p>
        <p>{Math.max(0, e - (width - rowSum + 1)) }</p>
      </div>
    )}</div>
    <button onClick={close}>Close Popup</button>
  </div>
}