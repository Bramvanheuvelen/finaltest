import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addEvaluation } from '../actions/evaluations'
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class CreateEvaluation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addEvaluation(this.state);
    this.setState({
      score: "",
      remark: "",
      date: '',
      selectedValue: ""
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

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <br/>
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
            <br />
            <Button type="submit">ADD EVALUATION</Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default connect(null, {addEvaluation})(CreateEvaluation)
