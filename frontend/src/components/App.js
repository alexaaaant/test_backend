import React, {Component} from 'react'
import {connect} from "react-redux"
import {changeHide, getNodeChild, getNodes, deleteNode, changeNode, addNode} from "../store/actions/action"
import './App.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons'

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

	renderNodes = (nodes) => {
		const {changeHide} = this.props
		const {route} = this.state
		return Object.keys(nodes).map(key => {
				return (
					<React.Fragment key={key}>
						<div className='node'>
						<span>
							<FontAwesomeIcon onClick={() => {
								!nodes[key].loaded ? this.getNode(key, nodes[key]) : changeHide(key, nodes[key].hide)
							}} icon={nodes[key].hide ? faCaretRight : faCaretDown}/>
						</span>
							<span onClick={() => this.clickNode(nodes[key], key)}
								  className={route === key ? 'selected' : ''}>{nodes[key].name}</span>
						</div>
						<React.Fragment>
							{!nodes[key].hide &&
							<div className='child'>
								{this.renderNodes(nodes[key]['child_nodes'])}
							</div>
							}
						</React.Fragment>
					</React.Fragment>
				)
			}
		)
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

	render() {
		const {nodes, deleteNode} = this.props
		const {node, route, changeable} = this.state
		return (
			<div className="main">
				<div className='title'>Иерархия узлов</div>
				<div className='nodes'>
					{this.renderNodes(nodes)}
				</div>
				<div className='change'>
					<span onClick={this.addChild}>+</span>
					<span onClick={() => {
						route.length !== 0 && deleteNode(route)
					}}>-</span>
				</div>
				<React.Fragment>
					{route.length > 0 &&
					<div className='node_info'>
						<span>Узел</span>
						<form onSubmit={this.handleSubmit}>
							<label>
								Имя узла:
								<input type='text' value={node.name} name='name' disabled={!changeable}
									   onChange={this.handleChange}/>
							</label>
							<label>
								IP-адрес:
								<input type='text' value={node.ip} name='ip' disabled={!changeable}
									   onChange={this.handleChange}/>
							</label>
							<label>
								Web-порт
								<input type='text' value={node.port} name='port' disabled={!changeable}
									   onChange={this.handleChange}/>
							</label>
							<React.Fragment>
								{changeable ?
									<div>
										<input value='Принять' type='submit'/>
										<button onClick={this.cancelChange}>Отменить</button>
									</div> :
									<button onClick={() => this.setState({
										changeable: true,
										newNode: false
									})}>Изменить</button>
								}
							</React.Fragment>
						</form>
					</div>
					}
				</React.Fragment>
			</div>
		)
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
