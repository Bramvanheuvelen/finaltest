import React, { PureComponent } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllBatches, fetchBatch, createBatch } from '../actions/batches'
import CreateBatch from "./CreateBatch";

class BatchesList extends PureComponent {
    
    componentWillMount() {
        this.props.fetchAllBatches()
        }
        
          render() {
            const {batches} = this.props

            return (
              <div>
                <h1>All Batches</h1>
        
                <table>
                  <thead>
                    <tr>
                      <th>Batch nr</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    { batches.map(batch => (<tr key={batch.id}>
                      <td><Link to={ `/batches/${batch.id}` } onClick={() => this.fetchBatch(batch.id)}>Class {batch.id}</Link></td>
                      <td>{batch.startDate}</td>
                      <td>{batch.endDate}</td>
                    </tr>)) }
                  </tbody>
                </table>
                <div> 
                    <h1>Create a new batch</h1>
                <CreateBatch href='/batches/create' />
                </div>
            </div>
                    )
                    }
        }

const mapStateToProps = (state) => ({
    batches: state.batches
})

export default connect(mapStateToProps, { fetchAllBatches, fetchBatch, createBatch })(BatchesList)
