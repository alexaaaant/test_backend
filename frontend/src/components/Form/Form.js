import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { onlyNumbers } from '../../helpFunctions/formValidation'
import './Form.css'


class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeInfo: {
        name: "",
        port: "",
        ip: ""
      },
      validations: {
        onlyNumbers: true
      }
    }
  }

  componentDidMount() {
    const { node } = this.props
    node && this.setState({
      nodeInfo: node
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.node && (this.props.node.id !== prevProps.node.id)) {
      this.setState({
        nodeInfo: this.props.node
      })
    }
  }


  handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    this.setState(prevState => ({
      nodeInfo: { ...prevState.nodeInfo, [name]: value },
    }))
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

  render() {
    const {
      cancelChange,
      handleSubmit,
    } = this.props
    const {
      nodeInfo,
      validations
    } = this.state
    return (
      <div className='node_info'>
        <Form onSubmit={handleSubmit(nodeInfo)}>
          <FormGroup>
            <Label className='node_info__label' for='exampleName'>Имя узла:</Label>
            <Input type='text' value={nodeInfo.name} name='name'
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for='exampleIp' className='node_info__label'>IP-адрес:</Label>
            <Input type='text' value={nodeInfo.ip} name='ip'
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for='examplePort' className='node_info__label'>Web-порт:</Label>
            <Input type='text' value={nodeInfo.port} name='port'
              onChange={this.handleChange} invalid={!validations.onlyNumbers} />
            <FormFeedback>Можно использовать только цифры!</FormFeedback>
          </FormGroup>

          <React.Fragment>
            <div>
              <Button className='apply-button' disabled={!validations.onlyNumbers} outline color='secondary' type='submit'>Применить</Button>
              <Button className='cancel-button' outline color='secondary' onClick={cancelChange}>Отменить</Button>
            </div>
          </React.Fragment>
        </Form>
      </div>
    )
  }
}


export default FormComponent