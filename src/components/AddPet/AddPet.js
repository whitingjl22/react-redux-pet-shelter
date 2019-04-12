import React from "react"
import "./AddPet.css"

import { connect } from "react-redux"
import { createPet } from "../../redux"
import { Redirect, Link } from "react-router-dom"

class AddPet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      type: "",
      description: "",
      skill_1: "",
      skill_2: "",
      skill_3: "",
      nameValid: false,
      typeValid: false,
      descriptionValid: false,
      toPetList: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.name.length < 3) {
        this.setState({ nameValid: false })
      } else {
        this.setState({ nameValid: true })
      }
      if (this.state.type.length < 3) {
        this.setState({ typeValid: false })
      } else {
        this.setState({ typeValid: true })
      }
      if (this.state.description.length < 3) {
        this.setState({ descriptionValid: false })
      } else {
        this.setState({ descriptionValid: true })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.makePet({
      name: this.state.name,
      type: this.state.type,
      description: this.state.description,
      skill_1: this.state.skill_1,
      skill_2: this.state.skill_2,
      skill_3: this.state.skill_3
    })

    this.setState({
      toPetList: true
    })
  }

  render() {
    if (this.state.toPetList === true) {
      return <Redirect to="/" />
    }
    return (
      <div className="addPetContainer">
        <h3>Know of a pet needing a home!</h3>
        <div className="errorMessage">
          {this.state.nameValid ? null : "Pet name must be at least 3 characters long"}
        </div>
        <div className="errorMessage">
          {this.state.typeValid ? null : "Pet type must be at least 3 characters long"}
        </div>
        <div className="errorMessage">
          {this.state.descriptionValid ? null : "Pet description must be at least 3 characters long"}
        </div>
        <div className="addPetForm">
          <form onSubmit={this.handleSubmit}>
            <label>Pet name:</label>
            <br />
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            <br />
            <label>Pet type:</label>
            <br />
            <input type="text" name="type" value={this.state.type} onChange={this.handleChange} />
            <br />
            <label>Description:</label>
            <br />
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
            <br />
            <br />
            <label>Skills:</label>
            <br />
            <label>Skill 1:</label>
            <input type="text" name="skill_1" value={this.state.skill_1} onChange={this.handleChange} />
            <br />
            <label>Skill 2:</label>
            <input type="text" name="skill_2" value={this.state.skill_2} onChange={this.handleChange} />
            <br />
            <label>Skill 3:</label>
            <input type="text" name="skill_3" value={this.state.skill_3} onChange={this.handleChange} />
            <br />
            <br />
            <input
              type="submit"
              name="add"
              value="Add pet"
              disabled={!this.state.nameValid || !this.state.typeValid || !this.state.descriptionValid}
            />
            <Link to={"/"}>
              <input type="button" name="cancel" value="Cancel" />
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  makePet: (newPet) => dispatch(createPet(newPet))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPet)
