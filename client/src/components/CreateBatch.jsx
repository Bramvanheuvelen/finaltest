import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { createBatch } from '../actions/batches'

class CreateBatch extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
            batch_id: '',
            startDate: '',
            endDate: ''
        }
        // this.handleChange = this.handleChange.bind(this);
		
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.createBatch(this.state)
	}

	handleChange = (event) => {
		const {name, value} = event.target

		this.setState({
		  [name]: value
		})
	}

	render() {

		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="batch_id">Batch nr</label>
					<input name="batch_id" id="batch_id" value={
						this.state.batch_id || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="startDate">Start Date</label>
					<input name="startDate" id="startDate" value={
						this.state.startDate ||  ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="endDate">End Date</label>
					<input name="endDate" id="endDate" value={
						this.state.endDate ||  ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit" onSubmit={this.handleSubmit}>Save</button>
			</form>
		)
	}
}

export default connect(null, {createBatch})(CreateBatch)