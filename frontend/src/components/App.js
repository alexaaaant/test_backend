import React, {Component} from 'react'
import {connect} from "react-redux"
import {getNodes} from "../store/actions/action"
import './App.css'

class App extends Component {

	componentDidMount() {
		const {getNodes} = this.props
		getNodes()
	}

	render() {
		return (
			<div className="main">
				<div className='title'>Иерархия узлов</div>
				<div className='nodes'/>
				<div className='change'>
					<span>+</span>
					<span>-</span>
				</div>
				<div className='node'/>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		nodes: state.reducer.nodes,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getNodes: (a) => dispatch(getNodes(a))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
