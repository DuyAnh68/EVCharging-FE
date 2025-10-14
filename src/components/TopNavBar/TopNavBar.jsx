import { NavLink } from "react-router-dom";
import "./style.css";

const TopNavBar = () => {
    return (
        <div className="top-nav">
            <NavLink to="/" className="logo-wrapper">
                <div className="logo">
                    <svg
                        width={48}
                        height={48}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_279_2929)">
                            <path
                                d="M37.9999 33.8001C40.4302 33.3066 42.5904 31.9277 44.0612 29.9311C45.5321 27.9344 46.2085 25.4625 45.9593 22.9951C45.7101 20.5278 44.5529 18.241 42.7125 16.5789C40.8721 14.9167 38.4798 13.9976 35.9999 14.0001H33.4799C32.8173 11.4347 31.5279 9.07409 29.7277 7.13008C27.9274 5.18607 25.6725 3.71957 23.1655 2.86224C20.6585 2.0049 17.9778 1.78357 15.3641 2.21813C12.7505 2.65268 10.2856 3.72951 8.19088 5.35193C6.09615 6.97435 4.43712 9.09158 3.36274 11.5135C2.28835 13.9355 1.83225 16.5863 2.03537 19.2281C2.2385 21.8699 3.0945 24.4198 4.52651 26.649C5.95853 28.8783 7.92173 30.717 10.2399 32.0001M25.9999 22.0001L17.9999 34.0001H29.9999L21.9999 46.0001"
                                stroke="#009951"
                                strokeWidth={4}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_279_2929">
                                <rect width={48} height={48} fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <h1 className="app-name">EV Charge</h1>
            </NavLink>

            <nav className="nav-items left">
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `nav-item ${isActive ? 'active' : ''}`}
                    end
                >
                    Home
                </NavLink>
                <NavLink 
                    to="/subscription" 
                    className={({ isActive }) => 
                        `nav-item ${isActive ? 'active' : ''}`}
                >
                    Subscription
                </NavLink>
                <NavLink 
                    to="/vehicle" 
                    className={({ isActive }) => 
                        `nav-item ${isActive ? 'active' : ''}`}
                >
                    Vehicle
                </NavLink>
                <NavLink
                    to="/booking"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? 'active' : ''}`}
                >
                    Booking
                </NavLink>
                <NavLink
                    to="/charge"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? 'active' : ''}`}
                >
                    Charge
                </NavLink>
            </nav>

            <nav className="nav-items right">
                <NavLink 
                    to="/login" 
                    className={({ isActive }) => 
                        `nav-item ${isActive ? 'active' : ''}`}
                >
                    Login
                </NavLink>
                <NavLink 
                    to="/signup" 
                    className={({ isActive }) => 
                        `nav-item signup ${isActive ? 'active' : ''}`}
                >
                    Sign Up
                </NavLink>
            </nav>
        </div>
    );
};

export default TopNavBar;