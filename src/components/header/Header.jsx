import { NavLink } from "react-router-dom";


const Header = () => {
  return (
    <header>
      <nav className="container d-flex justify-content-between">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/debts">Debts</NavLink>
        <NavLink to="/transaction">Transaction</NavLink>
      </nav>
    </header>
  );
};

export default Header;
