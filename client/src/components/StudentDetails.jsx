import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { updateStudent, fetchStudent } from "../actions/students";
import { addEvaluation } from "../actions/evaluations";
import { fetchBatch } from "../actions/batch";
import CreateStudent from "./CreateStudent";
import CreateEvaluation from "./CreateEvaluation";
import Paper from '@material-ui/core/Paper'

class StudentDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

    toggleEdit = () => {
      this.setState({
        edit: !this.state.edit
      });
    };

    componentDidMount() {
      this.props.fetchStudent(this.props.match.params.id)
    }

  updateStudent = student => {
    this.props.updateStudent(this.props.match.params.id, student.id);
    this.toggleEdit();
  };

  createEvaluation = evaluation => {
    const { student } = this.props;
    evaluation = { ...evaluation, student: student.id };
    this.props.createEvaluation(evaluation);
  };

  fetchBatch() {
    const { student } = this.props;
    const batchId = student.batch;
    this.props.fetchBatch(batchId);
  }

  render() {
    const { student} = this.props;
    if (!student) return null;

    const OrderedDate = student.evaluations.sort(function(a, b) {
      return a.date - b.date;
    });

    return (
      <div>
        <br />
        <CreateEvaluation onSubmit={this.addEvaluation} />
        <Paper className="styles" elevation={4}>
          <br />
          {this.state.edit && <CreateStudent initialValues={student} onSubmit={this.updateStudent} />}
          {!this.state.edit && (
            <div>
              <Button onClick={this.toggleEdit}>Edit student details</Button>
              <h1>
                {student.picture} {' '}
                {student.surname} {' '}
                {student.lastname}
              </h1>
            </div>
          )}
          {student.id && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Score</th>
                  <th>Evaluation date</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {OrderedDate.map(evaluation => (
                  <tr key={evaluation.id}>
                    <td>{student.id}</td>
                    <td>{evaluation.score}</td>
                    <td>{evaluation.date.slice(0, 10)}</td>
                    <td>{evaluation.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state, props) {
  return {
    student: state.student,
    evaluations: state.evaluations
  };
};

export default connect(mapStateToProps,{fetchStudent, updateStudent, fetchBatch, addEvaluation})(StudentDetails);
