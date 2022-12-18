import "../App.css"
export default function YearSlider(props) {
  const lastYear = (props.firstYear && props.numYears) ? props.firstYear + 4*(props.numYears - 1) : 0
  return (
    <div className="yearSlider">
      {props.firstYear && props.numYears && (props.reverse ? lastYear : props.firstYear)}
      <input 
        type="range" style={{width: "85%"}} min={0} max={props.numYears - 1} step={1} value={props.index}
        onChange={(e) => props.setIndex(e.target.value)}
        list="tickmarks"
      />
      <datalist id="tickmarks">
      {props.numYears > 0 && [...Array(props.numYears).keys()].map(e => 
        <option style={{color: "black"}} value={e} key={e}></option>
      )}
      </datalist>
      {props.firstYear && props.numYears && (props.reverse ? props.firstYear : lastYear)}
    </div>
  )
}