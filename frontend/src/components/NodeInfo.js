import React from 'react'
import  FormComponent  from "./Form/Form"

const NodeInfo = (props) => {
  return (
    <div className='node_info'>
          <span>Узел</span>
          <FormComponent {...props}/>
    </div>
  )
}


export default NodeInfo