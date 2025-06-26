import SuccessStyles from '.././styles/successPopup.css'

const SuccessMessage = ({ successMessage }) => {

  if(successMessage){
    return (<div className='success'>{successMessage}</div>)
  }
}


export default  SuccessMessage

