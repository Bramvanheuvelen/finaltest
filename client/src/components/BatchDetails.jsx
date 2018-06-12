import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchBatch, updateBatch} from '../actions/ads'
import AdForm from './AdForm'

class BatchDetails extends PureComponent {
  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  componentWillMount(props) {
    this.props.fetchBatch(this.props.match.params.id)
  }

  updateBatch= (batch) => {
    this.props.updateBatch(this.props.match.params.id, ad)
    this.toggleEdit()
  }

  render() {
    const {batch} = this.props
    if (!batch) return null

    return (
      <div>
        {
          this.state.edit &&
          <AdForm initialValues={ad} onSubmit={this.updateAd} />
        }

        {
          !this.state.edit &&
          <div>
            <h1>{ ad.title }</h1>
            <h3>Description: { ad.description }</h3>
            <h3>Picture: { ad.picture }</h3>
            <h3>Price: { ad.price }</h3>
            <h3>Email: { ad.email }</h3>
            <h3>Phone: { ad.phone   }</h3>
            <button onClick={ this.toggleEdit }>edit</button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    batches: state.batches
  }
}

export default connect(mapStateToProps, {fetchBatch, updateBatch})(BatchDetails)