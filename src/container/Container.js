import React from "react"

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import "./Container.css"
import PetList from "../components/PetList/PetList"
import AddPet from "../components/AddPet/AddPet"
import PetDetails from "../components/PetDetails/PetDetails"
import EditPet from "../components/EditPet/EditPet"
// import AddQuote from "../components/AddQuote/AddQuote"

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    console.log("CONTAINER PAGE PROPS:", this.props)
    console.log("CONTAINER PAGE STATE:", this.state)

    return (
      <div className="containerPage">
        <h1>Pet Shelter</h1>
        <BrowserRouter>
          <div className="contentContainer">
            <Switch>
              <Route exact path="/" component={PetList} />
              <Route path="/pets/new" component={AddPet} />
              <Route path="/pets/:id/edit" render={(props) => <EditPet {...props} />} />
              <Route path="/pets/:id" render={(props) => <PetDetails {...props} />} />
              <Route exact path="/pets" component={PetList} />
              {/* <Route path="/write/:id" render={(props) => <AddQuote {...props} />} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
