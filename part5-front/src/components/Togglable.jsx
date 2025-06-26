import React,{ useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props,ref) => {

  const [shown, setShown] = useState(false)

  const shouldShow = { display: shown? 'none':'' }
  const shouldHide = { display: shown? '':'none' }

  const toggleShow  = (shown) => {
    setShown(shown)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (<div>

    <div style={shouldShow}>
      <button onClick={() => toggleShow(true)}>New blog</button>
    </div>
    <div style={shouldHide}>

      {props.children}
      <button onClick={() => toggleShow(false)}>cancel</button>

    </div>


  </div>)

})

Togglable.displayName = 'Togglable'


export default Togglable