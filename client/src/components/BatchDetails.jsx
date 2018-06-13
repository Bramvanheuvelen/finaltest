import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../actions/batch";
import { fetchAllBatches } from "../actions/batches";
import { Link } from "react-router-dom";
import { addStudent, deleteStudent, fetchStudent } from "../actions/students";
import CreateStudent from "./CreateStudent";

class BatchDetails extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.fetchBatch(this.props.match.params.id)
  }

  addStudent = student => {
    const { batch } = this.props;
    student = { ...student, batch: batch.id };
    this.props.addStudent(student);
  };

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId)
    this.props.fetchBatch(this.props.match.params.id)
  }

  fetchStudent(studentId) {
    this.props.fetchStudent(studentId);
  }

  render() {
    const { batch } = this.props;
    if (!batch) return null

    return (
      <div>
        {!batch.id && <div>Loading...</div>}
        {batch.id && (
          <table>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {batch.students.map((student) => (
                <tr key={student.id}>
                  <td>{student.surname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.picture}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() => this.deleteStudent(student.id)}
                    >
                      Delete Student
                    </button>
                  </td>
                  <td>
                    {" "}
                    <Link
                      className="link"
                      to={`/students/${student.id}`}
                      onClick={() => this.fetchStudent(student.id)}
                    >
                      Student profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h1>Add new student</h1>
        <CreateStudent onSubmit={this.addStudent} />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    batch: state.batch,
    students: state.students
  };
};

export default connect(mapStateToProps,{fetchBatch,fetchAllBatches,addStudent,deleteStudent,fetchStudent})(BatchDetails);
