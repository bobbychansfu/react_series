import logo from "@assets/react.svg";

function Header({ title }: { title: string }) {
  return (
    <h1>
      {" "}
      {title} <img src={logo} alt="logo" className="logo" />{" "}
    </h1>
  );
}

export default Header;
