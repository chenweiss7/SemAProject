import React from 'react'

export default function Login() {


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

  return isValidPassword;

}


  const UserLogin = (event) => {
  event.preventDefault(); 
  let user = Login(username,password);
  if (user != undefined){
    alert(`Welcome Back ${user.name}`);
    navigation(`/profile/${user.id}`) 
  }
  else{
    alert('User Not Found');
  }
}
  

  
  return (
    <>
    <h1>Login Page</h1>
        <form onSubmit={UserLogin}>
        <label htmlFor='user-login'>שם משתמש:</label>
        <input type="text" id='user-login' onChange={(event) => SetUsername(event.target.value)} />
        

        <label htmlFor='user-password'>סיסמה:</label>
        <input type="password" id='user-password' onChange={(event) => SetPassword(event.target.value)} />
        <button>התחבר/י</button>
    </form>
    </>
  )
}
