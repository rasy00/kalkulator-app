export default function ButtonCalculator(props) {
  return (
    <button onClick={props.clickHandler} className={props.class} value={props.value}>
      {props.value}
    </button>
  );
}
