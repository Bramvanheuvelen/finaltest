import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../actions/students'

class CreateStudent extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
            surname: '',
            lastname: '',
            picture: '',
            batch_id: ''
        }
		
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.createStudent(this.state)
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
					<label htmlFor="surname">Surname: </label>
					<input name="surname" id="surname" value={
						this.state.surname || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="lastname">Last name: </label>
					<input name="lastname" id="lastname" value={
						this.state.lastname ||  ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="picture">Picture url: </label>
					<input name="picture" id="picture" value={
						this.state.picture ||  ''
					} onChange={ this.handleChange } />
				</div>

                <div>
					<label htmlFor="batch_id">Batch nr: </label>
					<input name="batch_id" id="batch_id" type="integer" value={
						this.state.batch_id ||  ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit" onSubmit={this.handleSubmit}>Save</button>
			</form>
		)
	}
}

export default connect(null, {createStudent})(CreateStudent)