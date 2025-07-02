import {BookOpen} from "lucide-react";
import React from "react";

const Navbar = () => {
    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-content">
                    <div className="nav-logo">
                        <div className="nav-logo-icon">
                            <BookOpen size={20} />
                        </div>
                        <span className="nav-logo-text">EDURIA</span>
                    </div>
                    <div className="nav-menu">
                        <a href='/login' className="btn btn-primary">Masuk</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;