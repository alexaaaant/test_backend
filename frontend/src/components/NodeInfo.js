import React from 'react'

const NodeInfo = (props) => {
  const {
    node,
    changeable,
    handleChange,
    cancelChange,
    changeCurrNode,
    handleSubmit
  } = props
  return (
    <div className='node_info'>
      <span>Узел</span>
      <form onSubmit={handleSubmit}>
        <label>
          Имя узла:
          <input type='text' value={node.name} name='name' disabled={!changeable}
                 onChange={handleChange}/>
        </label>
        <label>
          IP-адрес:
          <input type='text' value={node.ip} name='ip' disabled={!changeable}
                 onChange={handleChange}/>
        </label>
        <label>
          Web-порт
          <input type='text' value={node.port} name='port' disabled={!changeable}
                 onChange={handleChange}/>
        </label>
        <React.Fragment>
          {changeable ?
            <div>
              <button type='submit'>Применить</button>
              <button onClick={cancelChange}>Отменить</button>
            </div> :
            <button onClick={changeCurrNode}>Изменить</button>
          }
        </React.Fragment>
      </form>
    </div>
  )
}


export default NodeInfo