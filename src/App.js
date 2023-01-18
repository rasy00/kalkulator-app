import { Component } from "react";
import ButtonGroup from "./container/ButtonGroup";
import Layar from "./component/Layar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_value: 0,
      recent_value: 0,
      assigned: "",
      integer: true,
    };
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
    this.update_value = this.update_value.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  update_value(value, isInteger, recent = 0) {
    this.setState({
      new_value: value,
      integer: isInteger,
      recent_value: recent,
    });
  }

  aritmaticth_operation(new_value, recent_value, operation) {
    let result;
    if (operation === "+") {
      result = Number(recent_value) + Number(new_value);
    } else if (operation === "-") {
      result = Number(recent_value) - Number(new_value);
    } else if (operation === "x") {
      result = Number(recent_value) * Number(new_value);
    } else if (operation === "%") {
      result = Number(recent_value) % Number(new_value);
    } else if (operation === "/") {
      result = Number(recent_value) / Number(new_value);
    }

    console.log(recent_value + new_value);
    return Number(result);
  }

  keyUpHandler(ev) {
    const number_code = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

    // checking input is number comparation with keyCode
    number_code.forEach((value, index) => {
      if (value === ev.keyCode) {
        // set input to state.new_value
        const value = this.state.new_value === 0 ? index : this.state.new_value + "" + index;
        this.update_value(value, this.state.integer);
        return 0;
      }
    });

    // checking for backspace or point
    if (ev.keyCode === 190 || ev.keyCode === 8) {
      if (ev.keyCode === 8) {
        let isInteger = this.state.integer;
        const index = this.state.new_value.length - 1;
        let value = this.state.new_value.length <= 1 ? "0" : this.state.new_value.substring(0, index);
        [...value].forEach((element) => {
          if (element === ".") {
            isInteger = false;
            return 0;
          }
          isInteger = true;
        });
        this.update_value(value, isInteger);
      } else {
        if (this.state.integer) {
          ev.target.value = ".";
          const value = this.state.new_value === 0 ? "0" : this.state.new_value + "" + ev.target.value;
          this.update_value(value, false);
        }
      }
    }

    ev.preventDefault();
  }

  handlerClick(ev) {
    let value = ev.target.value;
    let valueUp = this.state.new_value;
    let isInteger = this.state.integer;
    let recent = this.state.recent_value;
    if (isNaN(Number(value))) {
      if (value === ".") {
        valueUp = valueUp === 0 ? "0" : isInteger ? valueUp + "" + ev.target.value : valueUp;
        isInteger = false;
      } else if (value === "backspace") {
        const i = [...valueUp].length - 1;
        valueUp = [...valueUp].length <= 1 ? "0" : valueUp.toString().substring(0, i);
        [...valueUp].forEach((element) => {
          if (element === ".") {
            isInteger = false;
            return 0;
          }
          isInteger = true;
        });
      } else if (value === "=") {
        if (this.state.assigned !== "") {
          valueUp = this.aritmaticth_operation(this.state.new_value, this.state.recent_value, this.state.assigned);
        }

        this.setState({ assigned: "" });
      } else if (value === "C") {
        this.setState({
          recent_value: 0,
          assigned: "",
        });
        valueUp = 0;
        isInteger = true;
      } else {
        if (this.state.assigned !== "") {
          recent = this.aritmaticth_operation(this.state.new_value, this.state.recent_value, this.state.assigned);
        } else {
          recent = valueUp;
        }

        valueUp = 0;
        this.setState({ assigned: value });
      }
    } else {
      valueUp = this.state.new_value === 0 ? value : this.state.new_value + "" + value;
    }

    this.update_value(valueUp, isInteger, recent);
    ev.preventDefault();
  }

  render() {
    let sign = "";

    if (this.state.assigned !== "") {
      sign = (
        <div className="asign">
          <span>{this.state.assigned}</span>
        </div>
      );
    }
    return (
      <div className="kalkulator__wrapper" id={this.props.pId} onKeyUp={this.keyUpHandler}>
        <div className="kalkulator__header">
          <span>{this.state.integer ? "Calci" : "Float"}</span>
          {sign}
        </div>
        <Layar value={new Intl.NumberFormat("de-DE", { style: "decimal", maximumFractionDigits: 20 }).format(Number(this.state.new_value))} />
        <ButtonGroup handler={this.handlerClick} />
      </div>
    );
  }
}
