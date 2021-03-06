import React, { PureComponent } from "react";
import { connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addStudent, studentActionNull  } from '../actions/students'
import { fetchBatch } from '../actions/batch'

class CreateStudent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      surname: '',
      lastname: '',
      picture: '',
      batch_id: Number((window.location.href).split('/').pop())
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addStudent(this.state);
    this.setState({
      initialValues: "",
      surname: "",
      lastname: "",
      picture: "",
    });
  };

  componentWillUnmount() {
    this.props.studentActionNull();
    this.props.fetchBatch();
  };


  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};
    if (this.props.refresh === true) return (<Redirect to={`/batches/${Number((window.location.href).split('/').pop())}`} />)

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                label="Sur name"
                name="surname"
                id="surname"
                value={this.state.surname || initialValues.surname || ""}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <TextField
                label="Last name"
                name="lastname"
                id="lastname"
                value={this.state.lastname || initialValues.lastname || ""}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <TextField
                label="Picture"
                name="picture"
                id="picture"
                value={this.state.picture || initialValues.picture || ""}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <TextField
                label="Batch nr"
                name="batch_id"
                id="batch_id"
                value={this.state.batch_id || initialValues.batch_id || ""}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <Button type="submit">SUBMIT</Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    batch: state.batch,
    refresh: state.refresh
  };
};

export default connect(mapStateToProps, {addStudent, fetchBatch, studentActionNull})(CreateStudent)
