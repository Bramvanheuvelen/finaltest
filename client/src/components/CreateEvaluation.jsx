import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addEvaluation } from '../actions/evaluations'
import { addLastEvaluation } from '../actions/students'
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { Redirect } from 'react-router'


class CreateEvaluation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      batch: this.state,
      fireRedirect: false,
      remark: '',
      date: new Date(),
      teacher_id: '',
      student_id: Number((window.location.href).split('/').pop())
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addEvaluation(this.state);
    this.props.addLastEvaluation(this.state);
    this.setState({
      score: "",
      remark: "",
      date: new Date(),
      selectedValue: "",
      fireRedirect: true
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      selectedValue: event.target.value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};
    const { fireRedirect } = this.state

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <br />
              <div>
                <TextField
                  label="Remark"
                  name="remark"
                  id="remark"
                  value={this.state.remark || initialValues.remark || ""}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Evaluation Date</label><br/>	
                <TextField
                  label=""
                  name="date"
                  id="date"
                  type="date"
                  value={this.state.date || initialValues.date || ""}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <TextField
                  label="Your ID"
                  name="teacher_id"
                  id="teacher_id"
                  value={this.state.teacher_id || initialValues.teacher_id || ""}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <TextField
                  label="Student ID"
                  name="student_id"
                  id="student_id"
                  value={this.state.student_id || initialValues.student_id || ""}
                  onChange={this.handleChange}
                />
              </div>
              <FormLabel component="legend">Score</FormLabel>
              <FormControlLabel
                value="Green"
                name="score"
                control={<Radio />}
                label="Green"
                checked={this.state.selectedValue === "Green"}
                onChange={this.handleChange}
              />
              <FormControlLabel
                value="Yellow"
                name="score"
                control={<Radio />}
                label="Yellow"
                checked={this.state.selectedValue === "Yellow"}
                onChange={this.handleChange}
              />
              <FormControlLabel
                value="Red"
                name="score"
                control={<Radio />}
                label="Red"
                checked={this.state.selectedValue === "Red"}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <Button type="submit">SAVE</Button> {' '}
            <Button type="submit">SAVE & NEXT</Button>
          </form>
          {fireRedirect && (
            <Redirect to={`/batches/${this.props.batch.id}`}/>
          )}

        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    batch: state.batch
  };
};

export default connect(mapStateToProps, {addEvaluation, addLastEvaluation})(CreateEvaluation)
