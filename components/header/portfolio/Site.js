// Header
const Header = props => {
    return (
        <header className="bg-header">
            <div className="container-fluid no-mw pofol">
                <nav className="navbar navbar-expand">
                    <h1>
                        <a className="navbar-brand" href="#">
                            <img src={props.siteLogo} alt="" />
                        </a>
                    </h1>
                    <div className="collapse navbar-collapse">
                        <div className="title">
                            <p className="t-web">{props.siteName}</p>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
