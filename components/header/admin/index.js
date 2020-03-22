// Header
const Header = props => {
    return (
        <header className="bg-header">
            <div className="container">
                <nav className="navbar navbar-expand">
                    <h1><a className="navbar-brand" href="#"><img src="/img/common/logo.png" alt="MyPofol"/></a></h1>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <div className="login_area">
                            <a className="login" href="#"><span className="text _name">로그인이 필요합니다.</span> <img
                                src="/img/common/login.png" alt="myPofol"/></a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
