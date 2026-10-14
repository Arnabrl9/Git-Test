import {Routes,Route,Link, BrowserRouter} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

export default function Menu(){
    return(
        <>
            {/* <BrowserRouter> */}
                <nav>
                    <Link to = "/menu/">Home</Link> |
                    <Link to = "/menu/about">About</Link> |
                    <Link to = "/menu/contact">Contact</Link>
                    <Routes>
                        <Route path = "/" element ={<Home />} />
                        <Route path = "/about" element ={<About />} />
                        <Route path = "/contact" element ={<Contact />} />
                    </Routes>
                </nav>
            {/* </BrowserRouter> */}
        </>
    );
}