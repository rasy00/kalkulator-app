import { Component } from "react";
class Layar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  componentDidMount() {
    let textArea = document.getElementsByClassName("value")[0];
    let fontSize = `${textArea.clientHeight - 10}px`;
    textArea.style.fontSize = fontSize;
    textArea.scrollLeft = 0;
  }

  render() {
    return (
      <div className="layar">
        <span className="value">{this.props.value}</span>
      </div>
    );
  }
}

export default Layar;
