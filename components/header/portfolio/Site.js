// Header
const Header = props => {
    return (
        <header className="bg-header">
            <div className="container-fluid no-mw pofol">
                <nav className="navbar navbar-expand">
                    <h1><a className="navbar-brand" href="#"><a className="navbar-brand" href="#">
                        <span>Website Logo</span>
                    </a></a></h1>
                    <div className="collapse navbar-collapse">
                        <div className="title">
                            <p className="t-web">Website Name</p>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
