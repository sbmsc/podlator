import React from "react";

class Filter extends React.Component {
  state = {
    notfound: false,
  };
  handleSearch = (e) => {
    const filter = e.target.value.toUpperCase();
    const eachEp = document.querySelectorAll(".forsearch");
    for (let i = 0; i < eachEp.length; i++) {
      const a = eachEp[i].getElementsByTagName("h3")[0];
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        eachEp[i].style.display = "";
      } else {
        eachEp[i].style.display = "none";
      }
    }
    if (Array.from(eachEp).every((ele) => ele.style.display === "none"))
      this.setState({ notfound: true });
    else this.setState({ notfound: false });
  };
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };
  render() {
    return (
      <div className="filter">
        <div className="form-group has-search">
          <span className="fa fa-search"></span>
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            value={this.state.search}
            onKeyUp={this.handleSearch}
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
        </div>
        {this.state.notfound ? <h1>Sorry No results</h1> : ""}
      </div>
    );
  }
}
export default Filter;
