import { NavLink , Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import '../styles/NavBar.css';

export default function NavBar() {
    const {
        totalItems
    } = useCart();
    
  return (
    <>
        <div className="container" style={{position: "sticky", top: "2%", zIndex: "1020",marginTop: "1%"}}>
            <nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/administration">
                                    Administration
                                </NavLink>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="#">Action</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Another action</a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success me-3" type="submit">Search</button>
                        </form>
                        <Link className="btn btn-outline-primary me-2" to="/login">
                            Login
                        </Link>
                        <Link to="/cart">
                            <button className="position-relative btn btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" height="27" width="29" viewBox="0 0 576 512">
                                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>   
                                </svg>
                                <span className="position-absolute top-100  translate-middle badge rounded-pill bg-warning">{totalItems}</span>
                            </button>
                        </Link>  
                    </div>
                </div>
            </nav>
        </div>
    </>
  );
}
