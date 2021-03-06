import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import createEvaluation from '../../actions/evaluations/create'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Title from '../../components/UI/Title'
import { push } from 'react-router-redux'
import { RadioGroup, RadioButton } from 'react-radio-buttons'

const dialogStyle = {
  width: '500px',
  margin: '50px auto',
  padding: '2rem',
  position: 'relative',
  left: '200px',
  bottom: '350px'
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

class EvaluationForm extends PureComponent {

  constructor(props){
    super()

    const { color } = props

    this.state = {
      color,
    }
  }

  setColor(event){
    this.setState({
      color: event.toString()
    })
  }


  submitForm(event) {
    event.preventDefault()
    const { studentId } = this.props
    const thisStudent = this.props.students.filter(student => student._id === studentId)
    const daStudent = thisStudent[0]
    const batchId = daStudent.batch_id

    const evaluation = {
      date: this.refs.date.getValue(),
      color: this.state.color,
      remark: this.refs.remark.getValue(),
      student_id: studentId
    }
    this.props.createEvaluation(evaluation)
    this.props.push(`/batch/${batchId}`)

  }

  submitFormNext(event) {
    event.preventDefault()
    const { studentId } = this.props
    const { students } = this.props

    const evaluation = {
      date: this.refs.date.getValue(),
      color: this.state.color,
      remark: this.refs.remark.getValue(),
      student_id: studentId
    }
    this.props.createEvaluation(evaluation)

    const thisStudentIndex = students.findIndex(student => student._id === studentId)
    const nextStudent = students[thisStudentIndex+1]
    const firstStudent = students[0]

    if(thisStudentIndex === students.length-1){ this.props.push(`/student/${firstStudent._id}`)}
    else { this.props.push(`/student/${nextStudent._id}`)}

  }


  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="Add Evaluation" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField name="date" ref="date" type="date" hintText=""/>
          </div>
          <div className="input">
          <RadioGroup name="color" ref="color" onChange={ this.setColor.bind(this) } horizontal>
            <RadioButton value="green">
              Good and on track
            </RadioButton>
            <RadioButton value="yellow">
              Slightly off-track
            </RadioButton>
            <RadioButton value="red">
              Needs extra attention
            </RadioButton>
          </RadioGroup>
          </div>
          <div className="input">
            <TextField name="remark" ref="remark" type="text" hintText="Remark..."  />
          </div>
        </form>
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Save"
          primary={true} />
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitFormNext.bind(this) }
          label="Save & Next"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ students }) => ({ students })

export default connect(mapStateToProps, { createEvaluation, push })(EvaluationForm)
