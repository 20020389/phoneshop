import React from 'react'
import '../CSS/header1.css'

function Header1(){
    return(
        <div className='header'>
            <div className='header1'>
                <div id='sdt'><span>Hotline:<span id='so'> 0865.564.002</span></span></div>
                <div id='address'><span>Địa chỉ: <span id='DChi'>234 Hoàng Quốc Việt-Bắc Từ Liêm-HN</span></span></div>
                <div id='sign1'><a href="">Đăng kí |</a></div>
                <div id='sign2'><a href="">Đăng nhập</a></div>
            </div>
            <div className='header2'>
                <div id='logo'>
                    <div id='imgLogo'><img src="/image/logo.jpg" alt="" /></div>
                    <div id='NameLogo'><h2>DragonSmartphone</h2></div>
                </div>
                <div id='search'><input placeholder='Search...'></input></div>              
            </div>

            <div className='header3'>
                <div id='Left'></div>
                <div id='Right'>
                    <div id='top'></div>
                    <div id='mid'></div>
                    <div id='bot'></div>
                </div>
            </div>
        </div>
        
    )
}
export default Header1;