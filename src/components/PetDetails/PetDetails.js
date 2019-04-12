import React from "react"
import "./PetDetails.css"

import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deletePet } from "../../redux"
import { Redirect } from "react-router-dom"

class PetDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      type: "",
      description: "",
      likes: "",
      skill_1: "",
      skill_2: "",
      skill_3: "",
      toPetList: false
    }
  }

  componentDidMount = () => {
    let name = ""
    let type = ""
    let description = ""
    let likes = ""
    let skill_1 = ""
    let skill_2 = ""
    let skill_3 = ""

    for (let i = 0; i < this.props.pets.length; i++) {
      if (parseInt(this.props.match.params.id) === this.props.pets[i].id) {
        name = this.props.pets[i].name
        type = this.props.pets[i].type
        description = this.props.pets[i].description
        likes = this.props.pets[i].likes
        skill_1 = this.props.pets[i].skill_1
        skill_2 = this.props.pets[i].skill_2
        skill_3 = this.props.pets[i].skill_3

        this.setState({
          name: name,
          type: type,
          description: description,
          skill_1: skill_1,
          skill_2: skill_2,
          skill_3: skill_3,
          likes: likes
        })
        break
      }
    }
  }

  handleDeleteButton = () => {
    this.props.removePet(parseInt(this.props.match.params.id))

    this.setState({
      toPetList: true
    })
  }

  render() {
    if (this.state.toPetList) {
      return <Redirect to="/pets" />
    }
    return (
      <div className="petDetailsContainer">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <p>Details about {this.state.name}:</p>
        <div className="petDetails_contentContainer">
          <div className="petDetails_resultContainer">
            <p>
              <b>Pet type:</b> {this.state.type}
            </p>
            <p>
              <b>Description:</b> {this.state.description}
            </p>
            <p>
              <b>Likes:</b> {this.state.likes}
            </p>
            <p>
              <b>Skills:</b>
            </p>
            <p>{this.state.skill_1}</p>
            <p>{this.state.skill_2}</p>
            <p>{this.state.skill_3}</p>
            <button onClick={this.handleDeleteButton}>Adopt this pet!</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pets: state.pets
})

const mapDispatchToProps = (dispatch) => ({
  removePet: (id) => dispatch(deletePet(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetDetails)
