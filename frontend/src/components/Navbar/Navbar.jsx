import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import Search from "./Search";
import { useState } from "react";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleSearch = () => { };

    const onClearSearch = () => {
        setSearchQuery("");
    }

    const onLogout = () => {
        navigate("/login");
    }

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">

                <Link to="/" className="text-2xl font-bold text-blue-600">
                    NotesApp
                </Link>
                <Search value={searchQuery} onChange={({ target }) => {
                    setSearchQuery(target.value)
                }} handleSearch={handleSearch} onClearSearch={onClearSearch} />

                <ProfileInfo onLogout={onLogout} />

            </div>

        </nav>
    )
}

export default Navbar
