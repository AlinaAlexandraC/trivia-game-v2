const Layout = ({children}) => {
    return ( 
        <div className="d-flex flex-column align-items-center bg-hero">
            {children}
        </div>
    );
}
 
export default Layout;