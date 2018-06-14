import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../actions/batch";
import { addStudent, deleteStudent, fetchStudent } from "../actions/students";
import CreateStudent from "./CreateStudent";
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

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

    const totalStudents = batch.students.length
    const redStudents = this.props.batch.students.filter(student => student.score === "Red").length
    const yellowStudents = this.props.batch.students.filter(student => student.score === "Yellow").length
    const greenStudents = this.props.batch.students.filter(student => student.score === "Green").length
    const redStudentsPart = redStudents/totalStudents * 100
    const yellowStudentsPart = yellowStudents/totalStudents * 100
    const greenStudentsPart = greenStudents/totalStudents * 100



    return (
      <div>
        {!batch.id && <div>Loading...</div>}
        {batch.id && (
          <Paper className="styles" elevation={4}>
            <div style={{width: Math.floor( redStudentsPart ) + '%', backgroundColor: 'red', float: "left", color: "black", textAlign: "center"}}>{Math.floor(redStudentsPart)}% Red score</div>
            <div style={{width: Math.floor( yellowStudentsPart ) + '%', backgroundColor: 'yellow', float: "left", color: "black", textAlign: "center"}}>{Math.floor(yellowStudentsPart)}% Yellow score</div>
            <div style={{width: Math.floor( greenStudentsPart ) + '%', backgroundColor: 'green', float: "right", color: "black", textAlign: "center"}}>{Math.floor(greenStudentsPart)}% Green score</div>
            <div style={{clear: "both"}}> </div>
            <br />
            <table>
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Last given score</th>
                </tr>
              </thead>
         
              <tbody>
                {batch.students.map((student) => (
                  <tr key={student.id}>
                    <td><Link
                      className="link"
                      to={`/students/${student.id}`}
                      onClick={() => this.fetchStudent(student.id)}
                    >{student.picture}</Link></td>
                    <td><Link
                      className="link"
                      to={`/students/${student.id}`}
                      onClick={() => this.fetchStudent(student.id)}
                    >{student.surname}</Link></td>
                    <td><Link
                      className="link"
                      to={`/students/${student.id}`}
                      onClick={() => this.fetchStudent(student.id)}
                    >{student.lastname}</Link></td>
                    <td>{student.score}</td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => this.deleteStudent(student.id)}
                      >
                      Delete Student
                      </Button>
                    </td>
                    {/* <td>
                      {" "}
                      <Link
                        className="link"
                        to={`/students/${student.id}`}
                        onClick={() => this.fetchStudent(student.id)}
                      >
                      Student profile
                      </Link>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <h1>Add new student</h1>
            <CreateStudent onSubmit={this.addStudent} />
          </Paper>)}
      </div>
    )}}

const mapStateToProps = function(state) {
  return {
    batch: state.batch,
    students: state.students
  };
};

export default connect(mapStateToProps,{fetchBatch,addStudent,deleteStudent,fetchStudent})(BatchDetails);
