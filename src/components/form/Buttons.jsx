
// eslint-disable-next-line react/prop-types
function Buttons ( { titleButton, ID, cssClass, handleEvent } ) {
  return (
    <button className={cssClass} id={ID} onClick={(e)=> handleEvent(e)}  >{titleButton}</button>
  )
}


export default Buttons