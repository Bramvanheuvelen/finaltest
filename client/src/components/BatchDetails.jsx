import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../actions/batch";
import { fetchAllBatches } from "../actions/batches";
import { addStudent, deleteStudent, fetchStudent } from "../actions/students";
import CreateStudent from "./CreateStudent";
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
//import tileData from './tileData';


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
          <Paper className="styles" elevation={4}>
            <br />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Picture</th>
                </tr>
              </thead>
         
              <tbody>
                {batch.students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.surname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.picture}</td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => this.deleteStudent(student.id)}
                      >
                      Delete Student
                      </Button>
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

export default connect(mapStateToProps,{fetchBatch,fetchAllBatches,addStudent,deleteStudent,fetchStudent})(BatchDetails);
