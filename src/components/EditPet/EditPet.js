import React from "react"
import "./EditPet.css"

import { connect } from "react-redux"
import { updatePet } from "../../redux"
import { Redirect, Link } from "react-router-dom"

class EditPet extends React.Component {
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

  componentDidMount = () => {
    let name = ""
    let type = ""
    let description = ""
    let skill_1 = ""
    let skill_2 = ""
    let skill_3 = ""

    for (let i = 0; i < this.props.pets.length; i++) {
      if (parseInt(this.props.match.params.id) === this.props.pets[i].id) {
        name = this.props.pets[i].name
        type = this.props.pets[i].type
        description = this.props.pets[i].description
        skill_1 = this.props.pets[i].skill_1
        skill_2 = this.props.pets[i].skill_2
        skill_3 = this.props.pets[i].skill_3

        this.setState({
          name: name,
          type: type,
          description: description,
          skill_1: skill_1,
          skill_2: skill_2,
          skill_3: skill_3
        })
        break
      }
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
  }

  handleUpdateButton = () => {
    this.props.revisePet(parseInt(this.props.match.params.id), {
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
      <div className="editPetContainer">
        <h3>Edit this pet</h3>
        <div className="errorMessage">
          {this.state.nameValid ? null : "Pet name must be at least 3 characters long"}
        </div>
        <div className="errorMessage">
          {this.state.typeValid ? null : "Pet type must be at least 3 characters long"}
        </div>
        <div className="errorMessage">
          {this.state.descriptionValid ? null : "Pet description must be at least 3 characters long"}
        </div>
        <div className="editPetForm">
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
              name="edit"
              value="Edit pet"
              disabled={!this.state.nameValid || !this.state.typeValid || !this.state.descriptionValid}
              onClick={this.handleUpdateButton}
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

const mapStateToProps = (state) => ({
  pets: state.pets
})

const mapDispatchToProps = (dispatch) => ({
  revisePet: (id, updatedPet) => dispatch(updatePet(id, updatedPet))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPet)
