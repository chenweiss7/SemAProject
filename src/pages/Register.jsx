import React from 'react'
import { useState,useEffect,useRef, useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom'

export default function Register() {

const {AddNewUser,users,FindUser} = useContext(UserContext)

const navigation = useNavigate();

useEffect(() => {
  LoadCities()
},[]);






const [cities,SetCities] = useState([]);


const usernameRef = useRef();
const passwordRef = useRef();
const rePasswordRef = useRef();
const imageRef = useRef();
const firstnameRef = useRef();
const lastnameRef = useRef();
const emailRef = useRef();
const bdateRef = useRef();
const cityRef = useRef();
const streetRef = useRef();
const streetNumrRef = useRef();







const CheckHebrewLetters = (ch) => {
  return ch >= 'א'&& ch <= 'ת'
}

const  checkLetters = (ch) => {

  return ch >= 'a' && ch <= 'z';
}

const checkCapitalLetters = (ch) => {

  return ch >= 'A' && ch <= 'Z';
}

const checkNumbers = (ch) => {
  return ch >= '0' && ch <= '9';
}

const checkSymbols = (ch) => {
  //[!@#$%^&*+`~'=?\|\]\[\(\)\-<>/]


  return ch == '!' || ch == '@' || ch == '$' || ch == '#' || ch == '%' || ch == '+' || ch == '-' || ch == '^' || ch == '&' || ch == '*' || ch == '`' || ch == '~' || ch == '=' || ch == '<' || ch == '>' || ch  == '/' || ch == '(\)' || ch == '_' || ch == '|' || ch == '.' || ch == "'";
}


const CalcAge = (value) =>{

  let today = new Date(); // current date - recieved by the browser
  let userBday = new Date(value.value) // user input birth date
  let userAge = today.getFullYear() - userBday.getFullYear(); // rough calculation of age 
  let currentMonth = today.getMonth();
  let currentDay = today.getDate(); //gets the day of the month 

  if( today.getMonth() - userBday.getMonth() < 0 || today.getMonth() - userBday.getMonth() == 0 && today.getDate() < userBday.getDate()){
    userAge--;
  }
  console.log(userAge)

}

function CheckUserNameInput(target){
  for(let i = 0; i <target.value.length; i++){
    if(checkLetters(target.value[i]) == false && checkCapitalLetters(target.value[i]) == false && checkNumbers(target.value[i]) == false && checkSymbols(target.value[i]) == false){
      target.value = target.value.slice(0,i);
      target.classList.add('border-red');
    }
    else{
      target.classList.remove('border-red');
    }

  }

  if(target.value.length <= 0 || target.value.length > 60){
    //add an error message to the user for invalid input length
    return false
  }
  else{
    return true; //all chars not allowed have been deleted and the username length is valid
  }
}


//deletes unapproved chars
function CheckPasswordChars(target){
    for(let i = 0; i <target.value.length; i++){
    if(checkLetters(target.value[i]) == false && checkCapitalLetters(target.value[i]) == false && checkNumbers(target.value[i]) == false && checkSymbols(target.value[i]) == false){
      target.value = target.value.slice(0,i);
      target.classList.add('border-red');
    }
    else{
      target.classList.remove('border-red');

    } 
  
  }
}


//checks all password requirements
function CheckPasswordValidity(target){

  CheckPasswordChars(target) // another check for password chars
  let isValidPassword;
  let number = false, capitalLetter= false, symbol = false;

  for(let i = 0; i < target.value.length; i++){
    if(checkCapitalLetters(target.value[i]) == true){
      capitalLetter = true;
    }
    else if(checkNumbers(target.value[i]) == true){
      number = true;
    }
    else if(checkSymbols(target.value[i]) == true){
      symbol = true;
    }
  }

  
  if(number == true && capitalLetter == true && symbol == true && target.value.length > 6 && target.value.length < 13){
    target.classList.add('border-green');
    target.classList.remove('border-red');
    isValidPassword = true;
  }
  else{
    target.classList.remove('border-green') // incase the user inserted a good password and then deleted chars (onKeyUp ignores backspace and delete keys)
    target.classList.add('border-red');
    isValidPassword = false;
  }
  
  if(rePasswordRef.current.value != ''){
    CheckRePassword(rePasswordRef.current) // visual check for the input border
  }

  return isValidPassword;

}

//checks if the passwords match:
function CheckRePassword(target){

  if(target.value == '') return false;

  if(target.value != passwordRef.current.value){
    console.log("passwords do not match");
    target.classList.add('border-red');
    target.classList.remove('border-green');
    return false;
  }
  else{
    console.log("passwords match");
    target.classList.add('border-green');
    target.classList.remove('border-red');
    return true;
  }
}

function CheckUserAge(target){
  console.log("check age")
  let age = CalcAge(target);
    if( age >= 120 || age <= 0 || age == NaN){
      return false;
    }
    else{
      return true;
    }
}


//checks if the city exists in the cities database (text input, the user can enter a fictional place)
function CheckCity(target){
  let city = target.value;
  console.log(city)

  for(let i = 0; i < cities.length; i++){
    if(cities[i].שם_ישוב == city){
      console.log("City FOUND")
      return true
    }
  }
  console.log("City NOT FOUND")
  //@#add a message to the user that the city does not exist#@
  return false;
}



function CheckNameChars(target){
    for(let i = 0; i <target.value.length; i++){
    if(checkLetters(target.value[i]) == false && checkCapitalLetters(target.value[i]) == false && CheckHebrewLetters(target.value[i]) == false){
      target.value = target.value.slice(0,i);
      target.classList.add('border-red');
    }
    else{
      target.classList.remove('border-red');
    } 

    return true; // after all unapproved characters are removed
}}

// deletes extra @ chars and hebrew chars:
function CheckEmailChars(target){
  let atChar = false;
  for(let i = 0; i < target.value.length; i++){
    if(target.value[i] == '@' || CheckHebrewLetters(target.value[i])){
      if(target.value[i] == '@' && atChar == false){atChar = true;
      }
      else{
        target.value = target.value.slice(0,i);
      }
    }
  }
}

function CheckEmailValidity(target){
  CheckEmailChars(target); //making sure there's no extra @
  if(target.value.endsWith('.com')){
    target.classList.remove('border-red');
    return true;
  }
  else{
    target.classList.add('border-red');
    alert("כתובת המייל יכולה להסתיים רק ב: '.com'")
  }
}


function CheckInputLanguage(target){
    for (let i = 0; i < target.value.length; i++) {
      if (target.value[i] < 'א' && target.value[i] != ' '|| target.value[i] > 'ת' && target.value[i] != ' '){
        target.value = target.value.slice(0,i);
        target.classList.add('border-red');
       // alert('רק אותיות בעברית')
      }
      else{
        target.classList.remove('border-red');
      }

      return true; // after the invalid chars have been removed from the input
  }
}

function CheckStreetNumber(target){
  for(let i = 0; i < target.value.length; i++) {
    if(checkNumbers(target.value[i]) == false){
        target.value = target.value.slice(0,i);
    }
  }
  if(target.value < 0 || target.value  == ''){
    target.classList.add('border-red');
    return false;
  }
  else{
    target.classList.remove('border-red');
    return true;
  }
}


  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //NO IMAGE CHECK OR SAVE~~!!!!!
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  function CheckFormOnSubmition(e){
    console.log("CheckFormOnSubmition")
    e.preventDefault();
    if(CheckUserNameInput(usernameRef.current) && CheckPasswordValidity(passwordRef.current) && CheckRePassword(rePasswordRef.current) && CheckNameChars(firstnameRef.current) && CheckNameChars(lastnameRef.current) && CheckEmailValidity(emailRef.current) && CheckUserAge(bdateRef.current)&&CheckCity(cityRef.current) &&CheckInputLanguage(streetRef.current) && CheckStreetNumber(streetNumrRef.current)){
      console.log("valid form")
      RegisterNewUser();
    }
    // add an eles which shows what is wrong with the form inputs to the user!!!
  }

    function RegisterNewUser(){
        let newUser = {
        "username": usernameRef.current.value,
        "password": passwordRef.current.value,
        //insert img here;
        "firstname": firstnameRef.current.value,
        "lastname": lastnameRef.current.value,
        "email": emailRef.current.value,
        "birthdate": bdateRef.current.value,
        "city": cityRef.current.value,
        "street": streetRef.current.value,
        "streetNumber": streetNumrRef.current.value
      }
      console.log(newUser);
      console.log(newUser.email);
      if(FindUser(newUser.email) == undefined){
        console.log("New user added successfully")
        AddNewUser(newUser);
        navigation(`/login`)
      }
      else{
        console.log("user already exists")
      }
  }



async function LoadCities(){
  try {
    let res = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1567`);
    // without limit will only get the first 100 cities (out of 1267)
    let data = await res.json();
    console.log(data)
    data = data.result.records
    console.log(data)
    SetCities(data)
    console.log(cities)
  } catch (error) {
    console.error(error);
  }






}

  return (
    <>
    <h1>Register Page</h1>
    
    <form action="" onSubmit={(e) => CheckFormOnSubmition(e)} className='form register-form flex-column'>

        <label htmlFor="register-username">שם משתמש:</label>
        <input type="text" id='register-username' name='password' ref={usernameRef} required   maxLength={60}  onKeyUp={(event) => CheckUserNameInput(event.target)} />
        {/* pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[!@#$%^&*+`~'=?\|\]\[\(\)\-<>/])" */}


        <label htmlFor="register-password">סיסמה:</label>
        {/* pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[!@#$%^&*+`~'=?\|\_]\[\(\)\-<>/]).{7,12}" */}
        <input type="password" name="password" id="register-password" ref={passwordRef} title='בין 7 ל 12 תווים, לפחות אות גדולה אחת, תו מיוחד ומספר' minLength={7} maxLength={12} onKeyUp={(e) => CheckPasswordChars(e.target)}   onBlur={(e) => CheckPasswordValidity(e.target)} required />

        <label htmlFor="register-password-confirmation">אימות סיסמה:</label>
        <input type="password" name="password" id="register-password-confirmation" ref={rePasswordRef} title='בין 7 ל 12 תווים, לפחות אות גדולה אחת, תו מיוחד ומספר' minLength={7} maxLength={12} onKeyUp={(e) => CheckPasswordChars(e.target)} onBlur = {(e) => CheckRePassword(e.target)} required />

        <label htmlFor="register-image">תמונה:</label>
        <input type="file" name="user-image" id="register-image" accept='image/jpeg, image/jpg' ref={imageRef} required />

        <label htmlFor="first-name">שם פרטי:</label>
        <input type="text" name="first-name" id="first-name" ref={firstnameRef} onKeyUp={(e) => CheckNameChars(e.target)} required />

        <label htmlFor="last-name">שם משפחה:</label>
        <input type="text" name="last-name" id="last-name" ref={lastnameRef} onKeyUp={(e) => CheckNameChars(e.target)} required />



        <label htmlFor="register-email">כתובת דוא"ל:</label>
        <input type="email" name="user_email" id="register-email" ref={emailRef} pattern='.+@[a-z]+\.com'  onKeyUp={(e) => CheckEmailChars(e.target)} onBlur={(e) => CheckEmailValidity(e.target)} required />

        <label htmlFor="register-birth-date">תאריך לידה:</label>
        <input type="date" name="birth-date" id="register-birth-date" ref={bdateRef} min="1923-01-01" max="2023-01-01"  onBlur={(e) => CalcAge(e.target)} required />


        <label htmlFor="register-city">עיר מגורים:</label>
        <input type="text" name="city" id="register-city" ref={cityRef} list='city-list' required/>
        <datalist id='city-list'>
          {
            cities.map((city) => <option key = {city.שם_ישוב} value={city.שם_ישוב}></option>)
          }
        </datalist>

          <label htmlFor="register-street">רחוב:</label>
          <input type="text" name="user-street" id="register-street" ref={streetRef}  onKeyUp={(event) => CheckInputLanguage(event.target)} required />

          <label htmlFor="register-street-number">מספר בית:</label>
          <input type="number" id="register-street-number" name="user-street-number" ref={streetNumrRef} min={1} onChange={(e) => CheckStreetNumber(e.target)} required/>

        <button type='sumbit'>הרשם</button>

    </form>
    
    </>
  )
}
