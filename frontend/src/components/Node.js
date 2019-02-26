import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons"

const Node = (props) => {
  const {
    changeHide,
    route,
    nodes,
    getNode,
    renderNodes,
    clickNode
  } = props
  return Object.keys(nodes).map(key => {
      return (
        <React.Fragment key={key}>
          <div className='node'>
            <div className="horizontal-line"/>
            {!(!nodes[key].hide && nodes[key].loaded && (Object.keys(nodes[key].child_nodes).length === 0)) && <span>
                <FontAwesomeIcon onClick={() => {
                  !nodes[key].loaded ? getNode(key, nodes[key]) : changeHide(key, nodes[key].hide)
                }} icon={nodes[key].hide ? faCaretRight : faCaretDown}/>
              </span>}
            <span onClick={() => clickNode(nodes[key], key)}
                  className={route === key ? 'selected name' : 'name'}>{nodes[key].name}</span>
            <React.Fragment>
              {!nodes[key].hide &&
              <div className='child'>
                {renderNodes(nodes[key]['child_nodes'])}
              </div>
              }
            </React.Fragment>
          </div>
        </React.Fragment>
      )
    }
  )
}
export default Node