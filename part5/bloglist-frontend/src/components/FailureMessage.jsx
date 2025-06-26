import failureStyles from '.././styles/failurePopup.css'


const FailureMessage = ({ failureMessage }) => {

  if(failureMessage){
    return <div className='failure'>{failureMessage}</div>
  }
}

export default FailureMessage