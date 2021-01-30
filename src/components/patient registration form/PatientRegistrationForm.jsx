import { Component } from "react";
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import Form from '../form/Form';

class RegistrationForm extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Form />
                <Footer />
            </div>
        )
    }
}

export default RegistrationForm;