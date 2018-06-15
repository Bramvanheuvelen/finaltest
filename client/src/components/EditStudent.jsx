import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


class EditStudent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      batch: this.state,
      remark: '',
      date: new Date(),
      teacher_id: '',
      student_id: Number((window.location.href).split('/').pop())
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state)
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
              <br />
              <div>
                <TextField
                  label="Surname"
                  name="surname"
                  id="surname"
                  value={this.state.surname || initialValues.surname || ""}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                {/* <label>Evaluation Date</label><br/>	 */}
                <TextField
                  label="Late name"
                  name="lastname"
                  id="lastname"
                  value={this.state.lastname || initialValues.lastname || ""}
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
            </div>
            <br />
            <Button type="submit">SAVE</Button> {' '}
          </form>
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

export default connect(mapStateToProps)(EditStudent)
