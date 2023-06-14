const Filter = (props) => {
    return(
      <div> filter shown with  
        <input value={props.filterValue} onChange={props.handler}/> 
      </div>
    )
  }

export default Filter