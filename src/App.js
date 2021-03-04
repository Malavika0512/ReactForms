import React, { useState } from "react";
import './App.css';
export default function Contact() {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");

    const handleInput = e => {
        const copyFormData = { ...formData };
        copyFormData[e.target.name] = e.target.value;
        setFormData(copyFormData);
    };

    const sendData = async e => {
        e.preventDefault();
        const {firstname,lastname, email, phone, message} = formData
        try {
            const response = await fetch(
                "https://v1.nocodeapi.com/malavika0512/google_sheets/GWkiYkEgYDETlvvo?tabId=Feedback",
                {
                    method: "post",
                    body: JSON.stringify([[firstname,lastname, email, phone, message]]),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const json = await response.json();
            console.log("Success:", JSON.stringify(json));
            setMessage("Success");
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error");
        }
    };

    return (
        <div className="App">
          <h1 style={{textAlign:'center',color:'red'}}> HTCS VOLUNTEER REGISTRATION FORM</h1>
          <div>
          <div style={{marginLeft:"2em"}}>
            Prior to signing up, need all Volunteers to agree the following:
          </div>
          <br/>
          <ul style={{marginLeft:"2em"}}>
            <li>The safety of all Devotees and Volunteers should be the top priority at all times.</li>
            <li>Volunteers will practice being courteous to other Volunteers and Devotees.</li>
            <li>Volunteering at the Temple is a commitment. Out of respect for other Volunteers and Temple staff, please notify the Committee Chairperson or Scheduling Coordinator of any absences. This allows the team to plan accordingly and ensure that everything continues to run smoothly..</li>
            <li>Likewise, volunteers should be as flexible as possible to accommodate any changes in the schedule due to unanticipated circumstances.</li>
            <li>Please be respectful of the Hindu tradition and practices. Volunteers are expected to adhere to the cultural and religious guidelines set by Temple Management, including the Temple dress code.</li>
            <li>Our community is open to Devotees of all walks of faith. HTCS reserves the right to restrict any volunteer and deny their service at the temple, should it become necessary.</li>
            <li>HTCS shall not be deemed responsible for any injuries, disability, or loss of belongings within the temple premises.</li>
          </ul>      
          </div>
          <div style={{marginLeft:"2em"}}>
            <input type="checkbox" id="terms" name="terms"/>
            <label for="horns"> I agree to all the above terms and conditions</label>
          </div>
            <form
                style={{marginTop:'5em'}}
                id="contact"
                name="contact"
                required
                onSubmit={sendData}
            > 
            <div class="wrapper">
                <div>Name of the Volunteer</div>
                <div></div>
                <div>Email</div>
                <div>Phone</div>
                <div>
                  <input        
                        size= '40'
                        height = '50'
                        name="firstname" 
                        type="text"
                        placeholder="First Name"
                        required
                        onChange={handleInput}
                    />
                </div>
                <div>
                  <input
                        style = {{marginLeft:'2em'}}
                        size= '40'
                        name="lastname" 
                        type="text"
                        placeholder="Last Name"
                        required
                        onChange={handleInput}
                    />
                </div>
                <div>
                  <input
                      size = '40'
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                      onChange={handleInput}
                  />
                </div>
                <div>
                  <input
                    size = '40'
                    name="phone"
                    type="phone"
                    placeholder="Phone"
                    required
                    onChange={handleInput}
                />
                </div>
            </div>
            
            <div style={{textAlign:'center',marginTop: '10em'}}>
              <input name="submit" type="submit" value="SUBMIT" />
              {message}
            </div>
             
            </form>
        </div>
    );
}