import React, {Component} from 'react'
import {connect} from "react-redux"
import {changeHide, getNodeChild, getNodes} from "../store/actions/action"
import './App.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons'

class App extends Component {
	state = {
		node: {}
	}

	componentDidMount() {
		const {getNodes} = this.props
		getNodes()
	}

	clickNode = (node) => {
		this.setState({node})
	}

	getNode = (route, node) => {
		const {getNodeChild} = this.props
		!node.loaded && getNodeChild(route, node.hide)
	}

	renderNodes = (nodes) => {
		const {changeHide} = this.props
		return Object.keys(nodes).map(key => {
				return (
					<React.Fragment key={nodes[key].id}>
						<div className='node'>
						<span>
							<FontAwesomeIcon onClick={() => {
								!nodes[key].loaded ? this.getNode(key, nodes[key]) : changeHide(key, nodes[key].hide)
							}} icon={nodes[key].hide ? faCaretRight : faCaretDown}/>
						</span>
							<span onClick={() => this.clickNode(nodes[key])}>{nodes[key].name}</span>
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


	render() {
		const {nodes} = this.props
		const {node} = this.state
		return (
			<div className="main">
				<div className='title'>Иерархия узлов</div>
				<div className='nodes'>
					{this.renderNodes(nodes)}
				</div>
				<div className='change'>
					<span>+</span>
					<span>-</span>
				</div>
				<React.Fragment>
					{node.id !== undefined &&
						<div className='node_info'>
							<span>Узел</span>
							<span>Имя узла: {node.name}</span>
							<span>IP-адрес: {node.ip}</span>
							<span>Web-port: {node.port}</span>
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
		changeHide: (route, hide) => dispatch(changeHide(route, hide))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
