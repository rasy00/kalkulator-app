import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./style/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
export default class ButtonTheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeActive: 0,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  theme = ["paleCornFlowerBlue", "apricot", "beautyBush", "viking", "sandyBeach", "whiteIce", "yourPink"];

  clickHandler(ev) {
    const lenght = this.theme.length;
    const value = Number(ev.target.value);

    this.setState({ themeActive: value + 1 < lenght ? value + 1 : 0 });
    ev.preventDefault();
  }
  render() {
    return (
      <div className="app">
        <button onClick={this.clickHandler} className={this.theme[this.state.themeActive]} value={this.state.themeActive}>
          Change Theme
        </button>
        <App pId={this.theme[this.state.themeActive]} />
      </div>
    );
  }
}

root.render(
  <React.StrictMode>
    <ButtonTheme />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
