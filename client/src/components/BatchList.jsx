import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllBatches } from "../actions/batches";
import { fetchBatch, addBatch } from "../actions/batch";
import CreateBatch from './CreateBatch'
import Paper from '@material-ui/core/Paper'

class BatchesList extends PureComponent {

  componentWillMount() {
    this.props.fetchAllBatches();
  }

  fetchBatch(batchId) {
    this.props.fetchBatch(batchId);
  }

  addBatch = batch => {
    this.props.addBatch(batch);
  };

  render() {
    const { batches } = this.props;

    const OrderedBatches = batches.sort(function(a, b) {
      return a.batch_id - b.batch_id;
    });

    return (
      <div className="App">
        <h1>All the Batches</h1>
        <Paper className="styles" elevation={4}>
          <table>
            <thead>
              <tr>
                <th>Batch NR</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Nr Students</th>
              </tr>
            </thead>
            <tbody>
              {OrderedBatches.map(batch => (
                <tr key={batch.id}>
                  <td>{batch.batch_id}</td>
                  <td>
                    {batch.startDate.slice(0, 10)}
                  </td>
                  <td>{batch.endDate.slice(0, 10)}</td>
                  <td>{batch.students.length}</td>
                  <td>
                    <Link
                      className="link"
                      to={`/batches/${batch.id}`}
                      onClick={() => this.fetchBatch(batch.id)}
                    >
                    Click for class
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          <CreateBatch href='/batches/create' />
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

export default connect(mapStateToProps, { fetchAllBatches, fetchBatch, addBatch})(BatchesList);
