import React from "react"
import "./PetList.css"

import { connect } from "react-redux"
import { Link } from "react-router-dom"

class PetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    console.log("PET-LIST PAGE PROPS:", this.props)
    console.log("PET-LIST PAGE STATE:", this.state)

    return (
      <div className="petlistContainer">
        <h3>These pets are looking for a home!</h3>
        <Link to={"/pets/new"}>
          <p>Add a pet to the shelter</p>
        </Link>

        <div className="petlist_contentContainer">
          <div className="petlist_resultContainer">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.pets
                  .sort((a, b) => {
                    if (a.type.toUpperCase() < b.type.toUpperCase()) {
                      return -1
                    }
                    if (a.type.toUpperCase() > b.type.toUpperCase()) {
                      return 1
                    }
                  })
                  .map((pet, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{pet.name}</td>
                        <td>{pet.type}</td>
                        <td>
                          <Link to={"/pets/" + pet.id}>
                            <button>Details</button>
                          </Link>
                          <Link to={"/pets/" + pet.id + "/edit"}>
                            <button>Edit</button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pets: state.pets
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetList)
