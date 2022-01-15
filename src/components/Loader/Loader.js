import Loader from "react-loader-spinner";

export default function Spinner() {
  return (
    <div>
      <Loader
        type="Hearts"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
}
