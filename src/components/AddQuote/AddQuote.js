import React from "react"
import "./AddQuote.css"

import { connect } from "react-redux"
import { createQuote } from "../../redux"
import { Redirect, Link } from "react-router-dom"

class AddQuote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      quote: "",
      quoteValid: false,
      toQuotesList: false
    }
  }

  componentDidMount = () => {
    let name = ""

    for (let i = 0; i < this.props.authors.length; i++) {
      if (parseInt(this.props.match.params.id) === this.props.authors[i].id) {
        name = this.props.authors[i].name

        this.setState({ name: name })
        break
      }
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.quote.length < 3) {
        this.setState({ quoteValid: false })
      } else {
        this.setState({ quoteValid: true })
      }
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
  }

  handleSubmitButton = () => {
    this.props.makeQuote({
      quote: this.state.quote,
      id: parseInt(this.props.match.params.id)
    })

    this.props.history.goBack()
  }

  render() {
    return (
      <div className="addAuthorContainer">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <p>Provide a quote by {this.state.name}:</p>
        <div className="errorMessage">
          {this.state.quoteValid ? null : "A quote must contain at least three characters!"}
        </div>
        <div className="table">
          <form onSubmit={this.handleFormSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>Quote:</td>
                  <td>
                    <br />
                    <br />
                    <br />
                    <input
                      className="nameInput"
                      type="text"
                      name="quote"
                      onChange={this.handleChange}
                      value={this.state.quote}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to={"/quotes/" + this.props.match.params.id}>
              <button>Cancel</button>
            </Link>
            <input type="submit" value="Submit" disabled={!this.state.quoteValid} onClick={this.handleSubmitButton} />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authors: state.authors
})

const mapDispatchToProps = (dispatch) => ({
  makeQuote: (newQuote) => dispatch(createQuote(newQuote))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuote)
