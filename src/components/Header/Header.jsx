import React from 'react';
import {Footer,Header,Container,Logo,LogoutBtn} from "../index"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

function Header(props) {
    const authStatus = useSelector((state)=>state.auth.status)
    return (
        <div>
            Header
        </div>
    );
}

export default Header;