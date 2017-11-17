import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchOneStudent } from '../actions/students/fetch'
import fetchEvaluations  from '../actions/evaluations/fetch'
import EvaluationForm from '../components/evaluations/EvaluationForm'
import RaisedButton from 'material-ui/RaisedButton'
import './Student.css'

const buttonStyle = {
  position: 'absolute',
  top: '80px',
  left: '400px'
}

class Student extends PureComponent {

  componentWillMount(){
    if (this.props.students.length === 0){ return this.props.push('/')}

    this.props.fetchEvaluations()
  }

  goBack(){
    const { studentId } = this.props.match.params
    const thisStudent = this.props.students.filter(student => student._id === studentId)
    const daStudent = thisStudent[0]
    const batchId = daStudent.batch_id
    this.props.push(`/batch/${batchId}`)
  }

  render() {
    const { students, evaluations } = this.props
    const { studentId } = this.props.match.params
    const thisStudent = this.props.students.filter(student => student._id === studentId)
    const daStudent = thisStudent[0]
    const studentEvaluations = evaluations.filter(evaluation => evaluation.student_id === daStudent._id)

    return (
      <div className="Student">
        <div className='name'>
          <h1>{ daStudent.name }</h1>
        </div>

        <div className="img" style={{backgroundImage:"url("+ daStudent.imageUrl+")" }}/>

      { studentEvaluations.map( (evaluation,index) => <div className='square-container'><div className='square' key={ index } style={ {height:'50px',width:'50px',background: evaluation.color}  }></div></div> )  }

      <EvaluationForm studentId={ daStudent._id }/>

      <RaisedButton
        style={ buttonStyle }
        onClick={ this.goBack.bind(this) }
        label="Back"
        primary={true} />
      </div>

    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })

export default connect(mapStateToProps, { fetchEvaluations, fetchOneStudent, push })(Student)
