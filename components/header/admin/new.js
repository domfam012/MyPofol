// Header
const Header = props => {
    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-expand pb-1">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <div className="login_area">
                            <button className="btn-close btn-block _close"><img src="/img/common/btn_close.png" alt="팝업 닫기"/></button>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
