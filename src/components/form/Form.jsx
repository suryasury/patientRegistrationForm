import { Component } from "react";
import { Formik, Form, Field } from 'formik';
import './Form.css';

class PatientForm extends Component {

    state = {
        defaultValue: 'choose',
        cities: [],
        states: [
            { name: 'Tamil Nadu', cities: ['Chennai', 'Salem', 'Coimbatore'], id: 1 },
            { name: 'Karnataka', cities: ['Kolar', 'Bangalore', 'Mysore'], id: 2 },
            { name: 'Kerala', cities: ['Kolam', 'Ernakulam', 'Palakkad'], id: 3 },
        ],
        selectedState: '',
        currentDate: '',
        firstName: '',
        lastName: '',
        pinCode: '',
        phoneNumber: '',
        age: 0,
        parentName: '',
        parentPhoneNumber: '',
        notValidAge: false,
        isInsurance: false,
        insurenceAvilable: '',
        invalidDob: false
    }

    selectStateHandler = (event) => {

        this.setState({ selectedState: event.target.value }, () => {
            let selectedState = this.state.selectedState;
            let city = [];
            city = this.state.states.find(stat => stat.name === selectedState).cities;
            this.setState({ cities: city }, () => { })
        });
    }

    validate = (value) => {
        let age = new Date().getFullYear() - new Date(value.currentDate).getFullYear();
        console.log(age)
        this.setState({ age: age, }, () => {});
        if (age < 18 && age >= 0){
            this.setState({ notValidAge: true }, () => { })
            this.setState({invalidDob: false}, () =>{})
        }
        else if(age >= 18){
            this.setState({notValidAge: false}, () =>{})
            this.setState({invalidDob: false}, () =>{})
        }

        else if(age < 0){
            this.setState({invalidDob: true}, () =>{})
            this.setState({notValidAge: false}, () =>{})
        }

        if (value.insurenceAvilable === 'yes')
            this.setState({ isInsurance: true })
        else
            this.setState({ isInsurance: false }, () => { })
    }

    render() {

        let populateState = this.state.states.map((data) => {
            return <option value={data.name} key={data.id}>{data.name}</option>
        })

        let populateCities = this.state.cities.map((data, index) => {
            return <option value={data} key={index}>{data}</option>
        })

        let { firstName,
            lastName,
            currentDate,
            pinCode,
            phoneNumber,
            age, parentName,
            parentPhoneNumber,
            insurenceAvilable } = this.state;

        return (

            <div className='form'>
                <h1 className='heading'>Patient Regestration Form</h1>
                <Formik
                    initialValues={{
                        firstName,
                        lastName,
                        currentDate,
                        pinCode,
                        phoneNumber,
                        age,
                        parentName,
                        parentPhoneNumber,
                        insurenceAvilable
                    }}
                    validate={this.validate}>
                    <Form>
                        <div className='formsets'>
                            <div className='name'>
                                <Field type='text' name='firstName' placeholder='Enter Patient First Name' className='pname' />
                                <Field type='text' name='lastName' placeholder='Enter Patient Last Name' className='pname' />
                            </div>
                            <div className='address'>
                                <textarea placeholder='enter patient address' />
                            </div>
                            <div className='dropdown'>
                                <select defaultValue={this.state.defaultValue} onChange={this.selectStateHandler}>
                                    <option value='choose' disabled>--Choose state--</option>
                                    {populateState}
                                </select>
                                <select defaultValue={this.state.defaultValue} onChange={this.selectCityHandler}>
                                    <option value='choose' disabled>--Choose City--</option>
                                    {populateCities}
                                </select>
                            </div>
                            <div className='pin-phone'>
                                <Field type='text' name='pinCode' placeholder='Enter Pincode' className='pin' />
                                <Field type='text' name='phoneNumber' placeholder='Enter Phone Number' className='pin' />
                            </div>
                            <div className='dob'>
                                <label>Date of Birth:</label>
                                <Field type='date' className='dobfield' name='currentDate' />
                                <div className='age'>
                                    Age: <textarea defaultValue={this.state.age} readOnly />
                                </div>
                            </div>
                            {this.state.invalidDob && <h3>Invalid Date of birth</h3>}
                            {this.state.notValidAge ? (<div>
                                <div className='warning'>
                                    <h3>Your age is less than 18. Please enter below details</h3>
                                </div>
                                <div>
                                    <Field type='text' name='parentName' placeholder='Enter Parent/Guardian Name' className='pname' />
                                    <Field type='text' name='parentPhoneNumber' placeholder='Enter Parent/Guardian Phonenumber' className='pname' />
                                </div>
                            </div>)
                                : null}
                            <div className='radio-button'>
                                <div className='gender'>
                                    <label style={{ fontWeight: 'bold' }}>Gender: </label>
                                    Male<Field type='radio' name='gender' value='male' className='genderOption' />
                                    Female <Field type='radio' name='gender' value='female' className='genderOption' />
                                </div>
                                <div className='martial'>
                                    <label style={{ fontWeight: 'bold' }}>Martial Status: </label>
                                    Married<Field type='radio' name='martialStatus' value='married' className='martialOption' />
                                    Single<Field type='radio' name='martialStatus' value='single' className='martialOption' />
                                </div>
                            </div>
                            <div className='name' style={{marginTop: '50px'}}>
                                <Field type='email' name='email' placeholder='Email address' className='pname' />
                                <Field type='text' name='emcContact' placeholder='Emergency contact Number' className='pname' />
                            </div>
                            <div className='radio-button'>
                                <div className='gender'>
                                    <label style={{ fontWeight: 'bold' }}>Insurence number Avilable: </label>
                                    Yes<Field type='radio' name='insurenceAvilable' value='yes' className='genderOption' />
                                    No<Field type='radio' name='insurenceAvilable' value='no' className='genderOption' />
                                </div>
                            </div>
                            {
                                this.state.isInsurance ? (<div>
                                    <div className='name'>
                                        <Field type='text' name='providerName' placeholder='Insurence Provider Name' className='pname' />
                                        <Field type='text' name='policyId' placeholder='Policy ID' className='pname' />
                                    </div>
                                </div>)
                                    : null
                            }
                            <div className='button'>
                                <button type='submit'>Submit</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        )
    }
}

export default PatientForm;