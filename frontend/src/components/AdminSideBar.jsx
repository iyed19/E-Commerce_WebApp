import { NavLink } from "react-router-dom";

export default function AdminSideBar(){
    return(
        <>
            <ul className="list-unstyled">
                <li>
                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="products">
                        <h3 className="mt-4 mb-5 text-center">Products</h3>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="categories">
                        <h3 className="mb-5 text-center">Categories</h3>
                    </NavLink>                    
                </li>
                <li>
                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/categories">
                        <h3 className="mb-5 text-center">Clients</h3>
                    </NavLink>                    
                </li>
                <li>
                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/categories">
                        <h3 className="mb-5 text-center">Orders</h3>
                    </NavLink>                    
                </li>
            </ul>
        </>
    )
}