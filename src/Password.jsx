import { useCallback, useEffect, useRef, useState } from "react";
import './Password.css';

const Password = () => {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  

const passwordref = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "123456789";
    let char = "@#$%^&*+";
    if (numAllow) {
      str = str + num;
    }
    if (charAllow) {
      str = str + char;
    }

    for (let i = 1; i <= length; i++) {
      let num = Math.floor(Math.random() * str.length + 1);
      pass = pass + str[num];
    }

    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

const clickHandler  =useCallback(()=>{
    window.navigator.clipboard.writeText(password);
},[password])


  useEffect(
    () => PasswordGenerator(),
    [length, numAllow, charAllow, PasswordGenerator]
  );



  return (
    <>
    <h2>Password Generater and Copy to Clipboard</h2>
      <div className="input-password">
        <input  ref={passwordref} type="text" value={password} name="password" readOnly />
        <button onClick={clickHandler}>Copy</button>
      </div>
      <br />
      <br />
      <div id="length-input-field">

     
      <input
        type="range"
        name="length"
        id="length"
        value={length}
        style={{ width: "189px" }}
        min="5"
        max="50"
        onChange={(event) => {
          setLength(event.target.value);
        }}
      />
      <label htmlFor="length">Length:{length}</label>
      </div>
      <br />
      <br />
<div id="number-input-field">
      <input
        type="checkbox"
        defaultChecked={numAllow}
        id="numberInclude"
        onChange={() => {
          setNumAllow((prevVAlue) => {
            return !prevVAlue;
          });
        }}
      />
      <label htmlFor="numberInclude">Number</label>
      </div>
      <br />
      <br />
      <div  id="char-input-field">

     
      <input
        type="checkbox"
        name="charInclude"
        id="charInclude"
        defaultChecked={charAllow}
        onChange={() => {
          setCharAllow((prevVAlue) => {
            return !prevVAlue;
          });
        }}
      />
      <label htmlFor="charInclude">Special Symbols</label>
      </div>
    </>
  );
};

export default Password;
