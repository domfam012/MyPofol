// Header
const Header = props => {
    return (
        <header className="bg-header">
            <div className="container-fluid no-mw">
                <nav className="navbar navbar-expand">
                    <h1><a className="navbar-brand" href="#"><img src="/img/common/logo.png" alt="MyPofol"/></a></h1>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <div className="login_area">
                            <a className="login" href="#"><span className="_name">홍길동</span>&nbsp;님<i className="far fa-sign-out"></i></a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
