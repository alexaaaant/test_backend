import React, { Component } from 'react'
import { connect } from "react-redux"
import { changeHide, getNodeChild, getNodes, deleteNode, addChangedNode, addNode } from "../store/actions/action"
import { Button, ButtonGroup, Alert } from 'reactstrap'
import './App.css'
import Form from './Form/Form'
import Node from "./Node/Node"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import NodeCreationWindow from './NodeCreationWindow/NodeCreationWindow'

class App extends Component {
  state = {
    selectedNodeId: null,
    isNodeCreation: false,
  }

  componentDidMount() {
    const { getNodes } = this.props
    getNodes(0)
  }

  clickNode = (selectedNodeId) => {
    this.setState({ selectedNodeId })
  }

  getNode = (node) => {
    const { getNodeChild } = this.props
    !node.loaded && getNodeChild(node)
  }

  cancelChange = (e) => {
    e && e.preventDefault()
    this.setState({
      selectedNodeId: null,
    })
  }

  closeNodeCreationWindow = (e) => {
    e && e.preventDefault()
    this.setState({
      isNodeCreation: false
    }
    )
  }

  handleSubmit = nodeInfo => e => {
    e.preventDefault()
    const { selectedNodeId, isNodeCreation } = this.state
    const { addChangedNode, addNode } = this.props
    !isNodeCreation ? addChangedNode(nodeInfo, selectedNodeId) : addNode(nodeInfo, selectedNodeId)
    !isNodeCreation ? this.cancelChange() : this.cancelNewNode()
  }


  addChild = () => {
    this.setState({
      isNodeCreation: true
    })
  }

  deleteNode = () => {
    const { deleteNode, nodes } = this.props
    const { selectedNodeId } = this.state
    deleteNode(selectedNodeId, nodes.get(selectedNodeId).parent_id)
    this.cancelChange()
  }


  render() {
    const { nodes, headNodes, error, errorInfo } = this.props
    const { selectedNodeId, isNodeCreation } = this.state
    return (
      <div className="main border border-secondary rounded">
        <Alert color="danger" className='alert' transition={{ in: false, timeout: 150 }} isOpen={error}>
          {errorInfo}
        </Alert>
        <div className='title'>Иерархия узлов</div>
        <div className='nodes border border-secondary rounded'>
          <div className='nodes-container'>
            {nodes.size > 0 && headNodes.map(selectedNodeId => this.renderNodes([nodes.get(selectedNodeId)]))}
          </div>
        </div>
        <div className='change'>
          <ButtonGroup vertical>
            <Button outline color='secondary' className='change__button' disabled={!selectedNodeId} onClick={this.addChild}><FontAwesomeIcon icon={faPlus} /></Button>
            <Button outline color='secondary' className='change__button' disabled={!selectedNodeId} onClick={this.deleteNode}><FontAwesomeIcon icon={faMinus} /></Button>
          </ButtonGroup>
        </div>
        <div className='nodeInfo_title'>Выбранный узел</div>
        <React.Fragment>
          {selectedNodeId !== null &&
            <Form
              node={nodes.get(selectedNodeId)}
              selectedNodeId={selectedNodeId}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              cancelChange={this.cancelChange}
            />
          }
          {isNodeCreation &&            
          <NodeCreationWindow
              selectedNodeId={selectedNodeId}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              cancelChange={this.closeNodeCreationWindow}
            />
            }
        </React.Fragment>

      </div>
    )
  }

  renderNodes = (nodes) => {
    const { changeHide } = this.props
    const { selectedNodeId } = this.state
    return <Node
      changeHide={changeHide}
      selectedNodeId={selectedNodeId}
      nodes={nodes}
      key={nodes[0] && nodes[0].id}
      getNode={this.getNode}
      renderNodes={this.renderNodes}
      clickNode={this.clickNode}
    />
  }
}

const mapStateToProps = state => {
  return {
    nodes: state.reduce.nodes,
    headNodes: state.reduce.headNodes,
    error: state.reduce.error,
    errorInfo: state.reduce.errorInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNodes: (parent_id) => dispatch(getNodes(parent_id)),
    getNodeChild: (node) => dispatch(getNodeChild(node)),
    changeHide: (selectedNodeId) => dispatch(changeHide(selectedNodeId)),
    deleteNode: (selectedNodeId, parent_id) => dispatch(deleteNode(selectedNodeId, parent_id)),
    addChangedNode: (node, selectedNodeId) => dispatch(addChangedNode(node, selectedNodeId)),
    addNode: (node, selectedNodeId) => dispatch(addNode(node, selectedNodeId))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
