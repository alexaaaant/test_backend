import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback, ButtonGroup } from 'reactstrap'
import { onlyNumbers } from '../../helpFunctions/formValidation'


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
      <div className='mt-3 col'>
        <Form onSubmit={handleSubmit(nodeInfo)}>
          <FormGroup className='row'>
            <Label className='col' for='exampleName'>Имя узла:</Label>
            <div className='col'>
              <Input type='text' value={nodeInfo.name} name='name'
                onChange={this.handleChange} />
            </div>
          </FormGroup>
          <FormGroup className='row'>
            <Label for='exampleIp' className='col'>IP-адрес:</Label>
            <div className='col'>
              <Input type='text' value={nodeInfo.ip} name='ip'
                onChange={this.handleChange} />
            </div>
          </FormGroup>
          <FormGroup className='row'>
            <Label for='examplePort' className='col'>Web-порт:</Label>
            <div className='col'>
              <Input type='text' value={nodeInfo.port} name='port'
                onChange={this.handleChange} invalid={!validations.onlyNumbers} />
            </div>
            <FormFeedback>Можно использовать только цифры!</FormFeedback>
          </FormGroup>
          <div className='col'>
            <ButtonGroup>
              <Button disabled={!validations.onlyNumbers} outline color='secondary' type='submit'>Применить</Button>
              <Button outline color='secondary' onClick={cancelChange}>Отменить</Button>
            </ButtonGroup>
          </div>
        </Form>
      </div>
    )
  }
}


export default FormComponent