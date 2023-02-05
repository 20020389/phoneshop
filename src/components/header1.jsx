import React from 'react'
import '../CSS/header1.css'

function Header1(){
    return(
        <div className='header'>
            <div className='header1'>
                <div id='sdt'><span>Hotline:<span id='so'> 0865.564.002</span></span></div>
                <div id='address'><span>Địa chỉ: <span id='DChi'>234 Hoàng Quốc Việt-Bắc Từ Liêm-HN</span></span></div>
                <div id='sign1'><a href="http://localhost:3000/register">Đăng kí |</a></div>
                <div id='sign2'><a href="http://localhost:3000/login">Đăng nhập</a></div>
            </div>
            <div className='header2'>
                <div id='logo' onclick="window.location.href='/'">
                    <div id='imgLogo'><img src="/image/logo.jpg" alt="" /></div>
                    <div id='NameLogo'>DragonSmartphone</div>
                </div>
                <div id='search'><input placeholder='Search...'></input></div>              
            </div>
        </div>
        
    )
}
export default Header1;