import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  fetchAllQuizzes,
  fetchQuiz
} from "../actions/batches";

class BatchesList extends PureComponent {
  static propTypes = {
    batches: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        batch_id: PropTypes.number.isRequired,
        start_date: PropTypes.date.isRequired,
        end_date: PropTypes.date.isRequired
      })
    ).isRequired
  };

  componentWillMount() {
    this.props.fetchAllBatches();
  }

  fetchBatch(quizId) {
    this.props.fetchBatch(batchId);
  }


  render() {
    const { batches } = this.props;

    const OrderedBatches = batches.sort(function(a, b) {
      return a.id - b.id;
    });

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <h1>List of Batches</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Batch</th>
              </tr>
            </thead>
            <tbody>
              {OrderedBatches.map(quiz => (
                <tr key={batch.id}>
                  <td>{batch.id}</td>
                  <td>
                    <Link
                      className="link"
                      to={`/batches/${batch.id}`}
                      onClick={() => this.fetchBatch(batch.id)}
                    >
                      {batch.batch_id}
                    </Link>
                  </td>
                  <td>
    
                </tr>
              ))}
            </tbody>
          </table>

          <Button
            className="createBatchButton"
            href={"/createbatch"}
            target="_blank"
          >
            Create a new Batch!
          </Button>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    batches: state.batches,
    batch: state.batch
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllBatches,
    fetchBatch
  }
)(BatchesList);