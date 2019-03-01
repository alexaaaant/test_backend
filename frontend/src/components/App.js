import React, {Component} from 'react'
import {connect} from "react-redux"
import {changeHide, getNodeChild, getNodes, deleteNode, addChangedNode, addNode} from "../store/actions/action"
import './App.css'
import NodeInfo from './NodeInfo'
import Node from "./Node"

class App extends Component {
  state = {
    node: {
      name: "",
      port: "",
      ip: "",
      id: null,
      parent_id: null,
      hide: true,
      loaded: true,
    },
    copyNode: {},
    nodeId:null,
    changeable: false,
    newNode: false
  }

  componentDidMount() {
    const {getNodes} = this.props
    getNodes(0)
  }

  clickNode = (nodeId) => {
    const {nodes} = this.props
    let node = nodes.get(nodeId)
    this.setState({node, copyNode: node, nodeId})
  }

  getNode = (node) => {
    const {getNodeChild} = this.props
    !node.loaded && getNodeChild(node)
  }

  handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    this.setState(prevState => ({
      node: {...prevState.node, [name]: value}
    }))
  }

  cancelChange = (e) => {
    e.preventDefault()
    const {copyNode} = this.state
    this.setState({
      node: copyNode,
      changeable: false
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {node, nodeId, newNode} = this.state
    const {addChangedNode, addNode} = this.props
    this.setState({
      changeable: false
    })
    !newNode ? addChangedNode(node, nodeId) : addNode(node, nodeId)
  }

  addChild = () => {
    this.setState({
      node: {
        name: "",
        port: "",
        ip: "",
        hide: true,
        loaded: true
      },
      changeable: true,
      newNode: true
    })
  }

  deleteNode = () => {
    const {deleteNode} = this.props
    const {nodeId, node} = this.state
    deleteNode(nodeId, node.parent_id)
    this.setState({
      nodeId: null
    })
  }

  changeCurrNode = () => {
    this.setState({
      changeable: true,
      newNode: false
    })
  }

  render() {
    const {nodes,headNodes} = this.props
    const {node, nodeId, changeable} = this.state
    return (
      <div className="main">
        <div className='title'>Иерархия узлов</div>
        <div className='nodes'>
          <div className='nodes-container'>
            {nodes.size > 0 && headNodes.map(nodeId => this.renderNodes([nodes.get(nodeId)]))}
          </div>
        </div>
        <div className='change'>
          <button disabled={!nodeId} onClick={this.addChild}/>
          <button disabled={!nodeId} onClick={this.deleteNode}/>
        </div>
        <React.Fragment>
          {nodeId !==null &&
          <NodeInfo
            node={node}
            changeable={changeable}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            cancelChange={this.cancelChange}
            changeCurrNode={this.changeCurrNode}
          />
          }
        </React.Fragment>
      </div>
    )
  }

  renderNodes = (nodes) => {
    const {changeHide} = this.props
    const {nodeId} = this.state
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
    headNodes: state.reduce.headNodes
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
