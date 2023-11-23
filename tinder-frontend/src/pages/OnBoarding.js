import { useState } from "react";
import Nav from "../components/Nav";
import {useCookies} from 'react-cookie'
import { useNavigate } from "react-router-dom";
import axios from "axios"

const OnBoarding = () => {
  const [cookies, setCookie,removeCookie] = useCookies(['user'])
  const [formData,setFormData] = useState({
    user_id: cookies.UserId,
    first_name:"",
    dob_day:"",
    dob_month:"",
    dob_year:"",
    show_gender: false,
    gender_identity:"man",
    gender_interest:"woman",
    url:"",
    about: "",
    matches: []
  })
  
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try{
      const response = await axios.put('http://localhost:8001/user', {formData})
      const success = response.status === 200
      if (success) navigate('/dashboard')
    }catch (err) {
  console.log(err)
  }

  };
  const handleChange = (e) => {
    console.log(e);
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    //Obtains the previous state and changes the values of it's items
    setFormData((prevState) => ({
    ...prevState,
    [name] : value
  }))
  };

  console.log(formData)

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h1>CREATE ACCOUNT</h1>
        <h2>Fill in your account details</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                required={true}
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                required={true}
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="trans-gender-identity"
                type="radio"
                name="gender_identity"
                required={true}
                value="trans"
                onChange={handleChange}
                checked={formData.gender_identity === "trans"}
              />
              <label htmlFor="trans-gender-identity">Trans</label>
            </div>
            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                required={true}
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                required={true}
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="trans-gender-interest"
                type="radio"
                name="gender_interest"
                required={true}
                value="trans"
                onChange={handleChange}
                checked={formData.gender_interest === "trans"}
              />
              <label htmlFor="trans-gender-interest">Trans</label>
            </div>
            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit"/>
          </section>

          <section>
            <label htmlFor="url"> Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container"></div>
            {formData.url && <img src ={formData.url} alt="profile pic :D"/>}
          </section>
        </form>
      </div>
    </>
  );
};
export default OnBoarding;