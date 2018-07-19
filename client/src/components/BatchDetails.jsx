import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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

  componentWillUnmount() {
    this.props.studentActionNull()
    this.props.fetchBatch(this.props.match.params.id)
  }

  addStudent = student => {
    const { batch } = this.props;
    student = { ...student, batch: batch.id };
    this.props.addStudent(student);
    this.props.onSubmit(this.state)
  };

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId)
    this.props.fetchBatch(this.props.match.params.id)
  }

  fetchStudent(studentId) {
    this.props.fetchStudent(studentId);
  }

  randomStudent = () => {
    const redStudents2 = this.props.batch.students.filter(student => student.score === "Red")
    const yellowStudents2 = this.props.batch.students.filter(student => student.score === "Yellow")
    const greenStudents2 = this.props.batch.students.filter(student => student.score === "Green")

    const Colors = Array(20)
      .fill("green")
      .concat(Array(45).fill("red"), Array(35).fill("yellow"));
    
    let randomColor = Colors[Math.floor(Math.random() * Colors.length)];
    let randomStudent;
    if (randomColor === "red" && redStudents2.length > 0) {
      randomStudent = redStudents2[Math.floor(Math.random() * redStudents2.length)];
    }
    if (randomColor === "green" && greenStudents2.length > 0) {
      randomStudent = greenStudents2[Math.floor(Math.random() * greenStudents2.length)];
    }
    if (randomColor === "yellow" && yellowStudents2.length > 0) {
      randomStudent = yellowStudents2[Math.floor(Math.random() * yellowStudents2.length)]      
    } 
    if (!randomStudent)
      return this.randomStudent()
    window.alert(`Send question to: `+ randomStudent.surname + ' ' + randomStudent.lastname + ' ' + randomStudent.picture)
  }

  render() {
    const { batch } = this.props;
    if (!batch) return null

    const totalStudents = batch.students.length
    const redStudents = this.props.batch.students.filter(student => student.score === "Red").length
    const yellowStudents = this.props.batch.students.filter(student => student.score === "Yellow").length
    const greenStudents = this.props.batch.students.filter(student => student.score === "Green").length
    const redStudentsPart = redStudents/totalStudents * 100 || 0
    const yellowStudentsPart = yellowStudents/totalStudents * 100 || 0
    const greenStudentsPart = greenStudents/totalStudents * 100 || 0

    if (this.props.refresh === true) return (<Redirect to={`/batches/${Number((window.location.href).split('/').pop())}`} />)
  
    return (
      <div>
        {!batch.id && <div>Loading...</div>}
        {batch.id && (
          <Paper className="styles" elevation={4}>
            <div>
              <div style={{width: Math.floor(redStudentsPart)+ '%', backgroundColor: 'red', float: "left", color: "black", textAlign: "center"}}>{Math.floor(redStudentsPart)}%</div>
              <div style={{width: Math.floor(yellowStudentsPart)+ '%', backgroundColor: 'yellow', float: "left", color: "black", textAlign: "center"}}>{Math.floor(yellowStudentsPart)}%</div>
              <div style={{width: Math.floor(greenStudentsPart)+ '%', backgroundColor: 'green',float: "left", color: "black", textAlign: "center"}}>{Math.floor(greenStudentsPart)}%</div>
            </div>
            <Button variant="raised" onClick={this.randomStudent}>Who do I ask a random question? gheghe...</Button>
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
                  </tr>
                ))}
              </tbody>
            </table>
            <h1>Add new student</h1>
            <CreateStudent onSubmit={this.addStudent} />
            <Button variant="raised" onClick={this.randomStudent}>ASK A QUESTION</Button>
          </Paper>)}
      </div>
    )}}

const mapStateToProps = function(state) {
  return {
    batch: state.batch,
    students: state.students,
  };
};

export default connect(mapStateToProps,{fetchBatch,addStudent,deleteStudent,fetchStudent})(BatchDetails);
