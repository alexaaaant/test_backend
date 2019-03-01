import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'

const FormComponent = (props) => {
    const {
      node,
      handleChange,
      cancelChange,
      handleSubmit,
      validations,
    } = props
    return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label className='node_info__label' for='exampleName'>Имя узла:</Label>
              <Input type='text' value={node.name} name='name'
                onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for='exampleIp' className='node_info__label'>IP-адрес:</Label>
              <Input type='text' value={node.ip} name='ip'
                onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for='examplePort' className='node_info__label'>Web-порт:</Label>
              <Input type='text' value={node.port} name='port'
                onChange={handleChange} invalid={!validations.onlyNumbers} />
              <FormFeedback>Можно использовать только цифры!</FormFeedback>
            </FormGroup>
  
            <React.Fragment>
              <div>
                <Button className='apply-button' disabled={!validations.onlyNumbers} outline color='primary' type='submit'>Применить</Button>
                <Button className='cancel-button' outline color='primary' onClick={cancelChange}>Отменить</Button>
              </div>
            </React.Fragment>
          </Form>
    )
  }
  
  
  export default FormComponent