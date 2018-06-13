import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllBatches } from "../actions/batches";
import { fetchBatch, addBatch } from "../actions/batch";
import CreateBatch from './CreateBatch'

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
      return a.id - b.id;
    });

    return (
      <div className="App">
        <h1>All the Batches</h1>
        <table>
          <thead>
            <tr>
              <th>Batch NR</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {OrderedBatches.map(batch => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td>{batch.startDate}</td>
                <td>{batch.endDate}</td>
                <td>
                  <Link
                    className="link"
                    to={`/batches/${batch.id}`}
                    onClick={() => this.fetchBatch(batch.id)}
                  >
                    See the class
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateBatch href='/batches/create' />
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
