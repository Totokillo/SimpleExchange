import React, { Component } from "react";
import Navitems from "./Navitems";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NavItemActive: ''
    }
  }

  render() {
    return (
      <nav>
        <ul>
          <Navitems item="Swap" tolink="/"></Navitems>
          <Navitems item="Farms" tolink="/farms"></Navitems>
          <Navitems item="Pools" tolink="/pools"></Navitems>
        </ul>
      </nav>
    )
  }
}

export default Navbar

