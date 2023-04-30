import React from 'react'
import { useState } from 'react';
import { nanoid } from 'nanoid'
import axios from 'axios';


const INITIAL_STATE = {
    id: nanoid(),
    firstname: '',
    lastname: '',
    email: '',
    subject: '',
    message: '',
}

const Contact = () => {
    const [form, setForm] = useState(INITIAL_STATE);
    // success state
    const [submitted, setSubmitted] = useState(false);
    // error state
    const [error, setError] = useState(null);
    // loading state
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await axios.post('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', form);
          console.log(response);
          setSubmitted(true);
          setError(null);
          setForm(INITIAL_STATE);
        } catch (error) {
          setSubmitted(false);
          setError('Submission failed. Please try again later.');
        } finally {
          setLoading(false);
        }
    };


  return (
    <>
    {/* success code */}
    {submitted && <p className='success'>Form submitted successfully!</p>}
    {/* error code */}
    {error && <p className='error'>Error: {error}</p>}
    <form onSubmit={handleSubmit}>
    <div className='container'>
         <div className="form-container">
            <h2>Contact US</h2>
            <label className='label' htmlFor="name">NAME</label>
             <div className="name-div">
                <input type="text" id='firstname' placeholder='First name' required
                value={form.firstname} onChange={handleChange}/>
                <input type="text" id='lastname' placeholder='Last name' required
                value={form.lastname} onChange={handleChange}/>
             </div>

             <div className="email-div">
                <label htmlFor="email">EMAIL</label>
                <input type="email" id='email'  placeholder='Email'
                value={form.email} onChange={handleChange} required/>
             </div>

             <div className="subject-div">
                <label htmlFor="subject">SUBJECT</label>
                <input type="text" name="subject" id="subject"  placeholder='Enter your message here...'
                value={form.subject} onChange={handleChange}/>
            </div>

             <div className="text-div">
             <label htmlFor="message">MESSAGE</label>
                <textarea name="textarea" id="message" placeholder='Message' required value={form.message} onChange={handleChange}></textarea>
             </div>
             <div className="btn">
                <button type='submit'>Send Message</button>
                {/* loading  */}
                {loading && <p className='submit'>Loading...</p>}
             </div>
         </div>

    </div>

    </form>
    </>
  )
}

export default Contact