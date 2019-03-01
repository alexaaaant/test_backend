import React, { Component } from 'react'
import { connect } from "react-redux"
import { changeHide, getNodeChild, getNodes, deleteNode, addChangedNode, addNode } from "../store/actions/action"
import { Button, ButtonGroup, Alert } from 'reactstrap'
import './App.css'
import NodeInfo from './NodeInfo'
import Node from "./Node"
import { onlyNumbers } from '../helpFunctions/formValidation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import NewNode from './ModalNewNode/ModalNewNode'

class App extends Component {
  state = {
    node: {},
    nodeNew: {},
    nodeId: null,
    newNode: false,
    validations: {
      onlyNumbers: true
    }
  }

  componentDidMount() {
    const { getNodes } = this.props
    getNodes(0)
  }

  clickNode = (nodeId) => {
    const { nodes } = this.props
    let node = nodes.get(nodeId)
    this.setState({ node, nodeId })
  }

  getNode = (node) => {
    const { getNodeChild } = this.props
    !node.loaded && getNodeChild(node)
  }

  handleChange = (event) => {
    const {newNode} = this.state
    let name = event.target.name
    let value = event.target.value
    if(newNode) {
      this.setState(prevState => ({
        nodeNew: { ...prevState.nodeNew, [name]: value },
      }))
    } else {
      this.setState(prevState => ({
        node: { ...prevState.node, [name]: value },
      }))
    }
    this.validate(name, value)
  }

  validate = (nameField, value) => {
    switch (nameField) {
      case 'port':
        this.setState(prevState => ({
          validations: { ...prevState.validations, onlyNumbers: onlyNumbers(value) }
        }))
        break
      default:
        break
    }
  }

  cancelChange = (e) => {
    e.preventDefault()
    const { nodes } = this.props
    const { nodeId, newNode } = this.state
    let node = nodes.get(nodeId)
    this.setState(prevState => ({
      node: node,
      validations: { ...prevState.validations, onlyNumbers: true },
      nodeId: newNode ? prevState.nodeId : null,
      newNode: false
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { node, nodeId, newNode, nodeNew } = this.state
    const { addChangedNode, addNode } = this.props
    !newNode ? addChangedNode(node, nodeId) : addNode(nodeNew, nodeId)
    this.setState(prevState => ({
      nodeId: newNode ? prevState.nodeId : null,
      newNode: false
    }))
  }


  addChild = () => {
    this.setState({
      nodeNew: {
        name: "",
        port: "",
        ip: ""
      },
      newNode: true
    })
  }

  deleteNode = () => {
    const { deleteNode } = this.props
    const { nodeId, node } = this.state
    deleteNode(nodeId, node.parent_id)
    this.setState({
      nodeId: null
    })
  }


  render() {
    const { nodes, headNodes, error, errorInfo } = this.props
    const { node, nodeId, validations, newNode, nodeNew } = this.state
    return (
      <div className="main">
        <Alert color="danger" className='alert' transition={{ in: false, timeout: 150 }} isOpen={error}>
          {errorInfo}
        </Alert>
        <div className='title'>Иерархия узлов</div>
        <div className='nodes'>
          <div className='nodes-container'>
            {nodes.size > 0 && headNodes.map(nodeId => this.renderNodes([nodes.get(nodeId)]))}
          </div>
        </div>
        <div className='change'>
          <ButtonGroup vertical>
            <Button outline color='primary' className='change__button' disabled={!nodeId} onClick={this.addChild}><FontAwesomeIcon icon={faPlus} /></Button>
            <Button outline color='primary' className='change__button' disabled={!nodeId} onClick={this.deleteNode}><FontAwesomeIcon icon={faMinus} /></Button>
          </ButtonGroup>
        </div>
        <React.Fragment>
          {nodeId !== null &&
            <NodeInfo
              node={node}
              nodeId={nodeId}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              cancelChange={this.cancelChange}
              changeCurrNode={this.changeCurrNode}
              validations={validations}
            />
          }
          {newNode &&            
          <NewNode
              node={nodeNew}
              nodeId={nodeId}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              cancelChange={this.cancelChange}
              changeCurrNode={this.changeCurrNode}
              validations={validations}
            />
            }
        </React.Fragment>

      </div>
    )
  }

  renderNodes = (nodes) => {
    const { changeHide } = this.props
    const { nodeId } = this.state
    return <Node
      changeHide={changeHide}
      nodeId={nodeId}
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
    changeHide: (nodeId) => dispatch(changeHide(nodeId)),
    deleteNode: (nodeId, parent_id) => dispatch(deleteNode(nodeId, parent_id)),
    addChangedNode: (node, nodeId) => dispatch(addChangedNode(node, nodeId)),
    addNode: (node, nodeId) => dispatch(addNode(node, nodeId))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
