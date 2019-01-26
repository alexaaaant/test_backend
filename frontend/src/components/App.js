import React, {Component} from 'react'
import {connect} from "react-redux"
import {changeHide, getNodeChild, getNodes} from "../store/actions/action"
import './App.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretRight} from '@fortawesome/free-solid-svg-icons'

class App extends Component {
	state = {
		openNode: ''
	}

	componentDidMount() {
		const {getNodes} = this.props
		getNodes()
	}

	clickNode = (route) => {
		this.setState({
			openNode: route
		})
	}

	getNode = (route, node) => {
		const {getNodeChild} = this.props
		!node.loaded && getNodeChild(route, node.hide)
	}

	renderNodes = (nodes) => {
		const {changeHide} = this.props
		return Object.keys(nodes).map(key => {
				if (!nodes[key].hide) {return this.renderNodes(nodes[key]['child_nodes'])}
				return (
					<div className='node' key={nodes[key].id}>
						<span>
							<FontAwesomeIcon onClick={() => {
								!nodes[key].loaded ? this.getNode(key, nodes[key]) : changeHide(key, nodes[key].hide)
							}} icon={faCaretRight}/>
						</span>
						<span onClick={() => this.clickNode(nodes[key])}>{nodes[key].name}</span>
					</div>
				)
			}
		)
	}


	render() {
		const {nodes} = this.props
		const {openNode} = this.state
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
				{/*<div className='node_info'>*/}
				{/*{*/}
				{/*openNode.length !== 0 &&*/}
				{/*nodes.filter(node => node['route'] === openNode).map(node => {*/}
				{/*return (*/}
				{/*<React.Fragment key={node.id}>*/}
				{/*<span>Узел</span>*/}
				{/*<span>Имя узла: {node.name}</span>*/}
				{/*<span>IP-адрес: {node.ip}</span>*/}
				{/*<span>Web-port: {node.port}</span>*/}
				{/*</React.Fragment>*/}
				{/*)*/}
				{/*})*/}


				{/*}*/}
				{/*</div>*/}
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
