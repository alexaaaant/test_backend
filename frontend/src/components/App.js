import React, {Component} from 'react'
import {connect} from "react-redux"
import {changeHide, getNodeChild, getNodes, deleteNode, changeNode, addNode} from "../store/actions/action"
import './App.css'
import NodeInfo from './NodeInfo'
import Node from "./Node"

class App extends Component {
  state = {
    node: {
      name: "",
      port: "",
      ip: "",
      child_nodes: {},
      hide: true,
      loaded: true
    },
    copyNode: {},
    route: '',
    changeable: false,
    newNode: false
  }

  componentDidMount() {
    const {getNodes} = this.props
    getNodes()
  }

  clickNode = (node, route) => {
    this.setState({node, route, copyNode: node})
  }

  getNode = (route, node) => {
    const {getNodeChild} = this.props
    !node.loaded && getNodeChild(route, node.hide)
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
    const {node, route, newNode} = this.state
    const {changeNode, addNode} = this.props
    this.setState({
      changeable: false
    })
    !newNode ? changeNode(node, route) : addNode(node, route)
  }

  addChild = () => {
    this.setState({
      node: {
        name: "",
        port: "",
        ip: "",
        child_nodes: {},
        hide: true,
        loaded: true
      },
      changeable: true,
      newNode: true
    })
  }

  deleteNode = () => {
    const {deleteNode} = this.props
    const {route} = this.state
    route.length !== 0 && deleteNode(route)
    this.setState({
      route: ''
    })
  }

  changeCurrNode = () => {
    this.setState({
      changeable: true,
      newNode: false
    })
  }

  render() {
    const {nodes,} = this.props
    const {node, route, changeable} = this.state
    return (
      <div className="main">
        <div className='title'>Иерархия узлов</div>
        <div className='nodes'>
          <div className='nodes-container'>
            {this.renderNodes(nodes)}
          </div>
        </div>
        <div className='change'>
          <button disabled={!route.length > 0} onClick={this.addChild}/>
          <button disabled={!route.length > 0} onClick={this.deleteNode}/>
        </div>
        <React.Fragment>
          {route.length > 0 &&
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
    const {route} = this.state
    return <Node
      changeHide={changeHide}
      route={route}
      nodes={nodes}
      getNode={this.getNode}
      renderNodes={this.renderNodes}
      clickNode={this.clickNode}
    />
  }
}

const mapStateToProps = state => {
  return {
    nodes: state.reduce.nodes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNodes: () => dispatch(getNodes()),
    getNodeChild: (route, hide) => dispatch(getNodeChild(route, hide)),
    changeHide: (route, hide) => dispatch(changeHide(route, hide)),
    deleteNode: (route) => dispatch(deleteNode(route)),
    changeNode: (body, route) => dispatch(changeNode(body, route)),
    addNode: (body, route) => dispatch(addNode(body, route))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
