import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchStudent} from '../actions/students'
//import { Link } from "react-router-dom";
//import AdForm from './AdForm'

class StudentDetails extends PureComponent {
  state = {}

componentWillMount() {
    this.props.fetchStudent(this.props.match.params.id)
  }

  render() {
    const {student} = this.props
    if (!student) return null

    return (
      <div>
          <div>
            <h1>Batch nr { student.surname }</h1>
            <h3>Start date: { student.lastname }</h3>
            <h3>End date: { student.picture }</h3>
            {/* { student.evaluations.map(evaluation => (<tr key={evaluation.id}>
                      <td> onClick={() => this.fetchEvaluation(evaluation.id)}>See Evaluations</td>
                      <td>{evaluation.score}</td>
                      <td>{evaluation.remark}</td>
                    </tr>)) } */}
          </div>
      </div>
      
    )
  }
}

const mapStateToProps = function (state) {
  return {
    evaluation: state.evaluation,
    student: state.student
  }
}

export default connect(mapStateToProps, {fetchStudent})(StudentDetails )