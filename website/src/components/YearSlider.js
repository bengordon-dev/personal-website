export default function YearSlider(props) {
  return (
    <div style={{backgroundColor: "white", paddingTop: 10, marginBottom: 10, paddingLeft: 5, paddingRight: 5, color:"black", paddingBottom: 10}}>
      {props.firstYear}
      <input 
        type="range" style={{width: 500}} min={0} max={props.numYears - 1} step={1} value={props.index}
        onChange={(e) => props.setIndex(e.target.value)}
        list="tickmarks"
      />
      <datalist id="tickmarks">
      {props.numYears > 0 && [...Array(props.numYears).keys()].map(e => 
        <option style={{color: "black"}} value={e} key={e}></option>
      )}
      </datalist>
      {props.firstYear && props.numYears && props.firstYear + 4*(props.numYears - 1)}
    </div>
  )
}