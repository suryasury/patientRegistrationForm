import './Header.css';

const header = () =>{
    return(
        <header>
            <h1 className='logo'>PRF</h1>
            <nav className='nav-bar'>
                <div><a href='/'>Home</a></div>
                <div><a href='/'>AboutUs</a></div>
                <div><a href='/'>ContactUs</a></div>
            </nav>
        </header>
    )
}

export default header;