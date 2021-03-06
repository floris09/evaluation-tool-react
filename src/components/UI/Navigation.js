// src/components/ui/Navigation.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
import fetchBatches from '../../actions/batches/fetch'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import BatchIcon from 'material-ui/svg-icons/action/thumbs-up-down'
import FlatButton from 'material-ui/FlatButton'

const TITLE = 'Student Evaluation Tool'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
  }

  signUp = () => {
    this.props.push('/sign-up')
  }

  goHome = () => {
    this.props.fetchBatches()
  }

  render() {
    const { signedIn } = this.props
    return (
      <AppBar
        title={TITLE}
        iconElementLeft={<IconButton onClick={this.goHome}><BatchIcon /></IconButton>}
        iconElementRight={signedIn ?
          <FlatButton label="Sign out" onClick={this.signOut.bind(this)} /> :
          <FlatButton label="Sign up" onClick={this.signUp} />
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { fetchBatches, push, signOut })(Navigation)
