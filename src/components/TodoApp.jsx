import React, { Component } from "react";
import "./TodoApp.css";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import check from "../assets/icon-check.svg";
import cross from "../assets/icon-cross.svg";
class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    noOfItems: 0,
    position: 1,
    darkMode:true
  };
  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };
  storeItems = (event) => {
    event.preventDefault();
    const { input, items, noOfItems } = this.state;
    input.length<=2 ?alert("enter atleast 2 character"):
    this.setState({
      items: [...items, { value: input, select: false, display: true }],
      input: "",
      noOfItems: noOfItems + 1,
    });
  };
  deleteItem = (key) => {
    let noOf = this.state.noOfItems;
    {
      this.state.items[key].select == false ? (noOf -= 1) : "";
    }
    this.setState({
      items: this.state.items.filter((data, index) => index !== key),
      noOfItems: noOf,
    });
  };
  selectItem = (key, mode) => {
    const item = this.state.items;
    let noOf = this.state.noOfItems;
    {
      mode == false ? (item[key].select = true) : (item[key].select = false);
    }
    {
      mode == false ? (noOf -= 1) : (noOf += 1);
    }
    this.setState({
      items: item,
      noOfItems: noOf,
    });
  };
  clearCompleted = () => {
    this.setState({
      items: this.state.items.filter((index) => index.select == false),
    });
  };
  showActive = () => {
    const item = this.state.items;
    for (let i = 0; i < item.length; i++) {
      if (item[i].select == true) {
        item[i].display = false;
      } else {
        item[i].display = true;
      }
    }
    this.setState({
      items: item,
      position: 2,
    });
  };
  showCompleted = () => {
    const item = this.state.items;
    for (let i = 0; i < item.length; i++) {
      if (item[i].select == false) {
        item[i].display = false;
      } else {
        item[i].display = true;
      }
    }
    this.setState({
      items: item,
      position: 3,
    });
  };
  showAll = () => {
    const item = this.state.items;
    for (let i = 0; i < item.length; i++) {
      item[i].display = true;
    }
    this.setState({
      items: item,
      position: 1,
    });
  };
  changeTheme = () =>{
    let theme=this.state.darkMode
    {theme==true ? theme=false:theme=true}
    this.setState({
      darkMode:theme
    })
  }
  render() {
    const { input, items, position,darkMode } = this.state;
    return (
      <div className={`darkBody ${darkMode==false ? "lightBody":""}`} >
        <div className="app">
          <div className="title">
            <h1>TODO</h1>
            {darkMode==true ? <img onClick={this.changeTheme} src={sun}/>:<img onClick={this.changeTheme} src={moon}/>}
          </div>
          <div className={`inputField ${darkMode==false ? "lightmode":""}`}>
            <div className={`circle ${darkMode==false ? "lightborder":""}`}></div>
            <form onSubmit={this.storeItems}>
              <input
                className={darkMode==false ? "lightmode":""}
                value={input}
                onChange={this.handleChange}
                type="text"
                placeholder="Create a new todo..."
              />
            </form>
          </div>
          <div className={`output ${darkMode==false ? "lightmode":""}`}>
            <ul>
              {items.map((data, index) => (
                <li
                  key={index}
                  className={`${darkMode==false ? "lightborder":""} ${data.display == false ? "hideApp" : ""} ${
                    data.select == true ? "completed" : ""
                  }`}
                >
                  <div>
                    <div
                      className={`circle ${darkMode==false ? "lightborder":""} ${
                        data.select == true ? "select" : ""
                      }`}
                      onClick={() => this.selectItem(index, data.select)}
                    >
                      {data.select == true ? <img src={check} /> : ""}
                    </div>
                    <span className={darkMode==false ? "lightmode":""}>{data.value}</span>
                  </div>
                  <img
                    onClick={() => this.deleteItem(index)}
                    className="cross"
                    src={cross}
                  />
                </li>
              ))}
            </ul>
            <div className="details">
              <p className="items">
                <span className="items">{this.state.noOfItems}</span>items left
              </p>
              <div className={`track ${darkMode==false ? "lightbar":""}`}>
                <div
                  className={`detailsText ${darkMode==false ? "lightbar":""} ${position == 1 ? "position" : ""}`}
                  onClick={this.showAll}
                >
                  All
                </div>
                <div
                  className={`detailsText ${darkMode==false ? "lightbar":""} ${position == 2 ? "position" : ""}`}
                  onClick={this.showActive}
                >
                  Active
                </div>
                <div
                  className={`detailsText ${darkMode==false ? "lightbar":""} ${position == 3 ? "position" : ""}`}
                  onClick={this.showCompleted}
                >
                  Completed
                </div>
              </div>
              <div className={`detailsTextTwo  ${darkMode==false ? "lightbar":""}`} onClick={this.clearCompleted}>
                Clear Completed
              </div>
            </div>
          </div>
          <p className="foot">Drag and drop to reader list</p>
        </div>
      </div>
    );
  }
}
export default TodoApp;
