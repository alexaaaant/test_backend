import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons"

const Node = (props) => {
  const {
    changeHide,
    nodeId,
    nodes,
    getNode,
    renderNodes,
    clickNode
  } = props
  return nodes.map(node => {
      return (
        <React.Fragment key={node.id}>
          <div className='node'>
            <div className="horizontal-line"/>
            {node.hasChild && <span>
                <FontAwesomeIcon onClick={() => {
                  !node.loaded ? getNode(node) : changeHide(node.id)
                }} icon={node.hide ? faCaretRight : faCaretDown}/>
              </span>}
            <span onClick={() => clickNode(node.id)}
                  className={nodeId === node.id ? 'selected name' : 'name'}>{node.name}</span>
            <React.Fragment>
              {!node.hide &&
              <div className='child'>
                {renderNodes(node['child_nodes'])}
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