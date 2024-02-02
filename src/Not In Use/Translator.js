// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const Translator = ({ name, value, onChange }) => {
//   const [text, setText] = useState("");
//   const [fromLanguage, setFromLanguage] = useState("");
//   const [toLanguage, setToLanguage] = useState("");

//   const handleLanguageChange = (event) => {
//     const selectedLanguage = event.target.value;
//     setFromLanguage(selectedLanguage);
//     handleTranslation(text, selectedLanguage, toLanguage);
//   };

//   const handleInputChange = (event) => {
//     const newText = event.target.value;
//     setText(newText);
//     // handleTranslation(text, toLanguage, fromLanguage);
//   };

//   const handleExchange = () => {
//     const currentText = text;
//     console.log(`currentText :${currentText}`);
//     const tempLanguage = fromLanguage;
//     setFromLanguage(toLanguage);
//     setToLanguage(tempLanguage);
//     handleTranslation(currentText, toLanguage, fromLanguage);
//   };

//   const handleTranslation = async(text, fromLang, toLang) => {
//     if (!text) return;
//     // const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
//     //   text
//     // )}&langpair=en-GB|gu-IN`;
//     const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
//       text
//     )}&langpair=${fromLanguage}|${toLanguage}`;
//     console.log(apiUrl);
//     await axios(apiUrl)
//       // .then((res) => res.json())
//       .then((data) => {
//         setText(data.responseData.translatedText);
//         console.log(`data : ${data.responseData.translatedText}`);
//         onChange(data.responseData.translatedText);
//       })
//       .catch((error) => {
//         console.error("Translation error:", error);
//         setText("Translation Error");
//       });
//   };

//   useEffect(() => {
//     if (text.trim() !== "") {
//       handleTranslation(text, fromLanguage, toLanguage);
//     }
//   }, [fromLanguage, toLanguage]);

//   const languages = {
//     "en-GB": "English",
//     "gu-IN": "Gujarati",
//     "hi-IN": "Hindi",
//     "kn-IN": "Kannada",
//     "pa-IN": "Panjabi",
//     "te-IN": "Telugu",
//   };

//   return (
//     <div className="container">
//       <div className="wrapper">
//         <div className="text-input">
//           <textarea
//             className="input_repair"
//             name="orderRemark"
//             placeholder="Order Remark (upto 500 characters)"
//             onChange={handleInputChange}
//             value={text}
//             style={{
//               height: "48px",
//               borderRadius: "5px",
//             }}
//           />
//         </div>
//         <div className="language-dropdown">
//           <select value={fromLanguage} onChange={handleLanguageChange}>
//             {Object.keys(languages).map((country_code) => (
//               <option key={country_code} value={country_code}>
//                 {languages[country_code]}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button onClick={handleExchange}>Done</button>
//       </div>
//     </div>
//   );
// };

// export default Translator;



import React, { useState, useEffect } from "react";

const Translator = () => {
  const [text, setText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en-GB");
  const [toLanguage, setToLanguage] = useState("");

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setFromLanguage(selectedLanguage);
    handleTranslation(text, selectedLanguage, toLanguage);
  };

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    // handleTranslation(text, toLanguage, fromLanguage);
  };

  const handleExchange = () => {
    const currentText = text;
    const tempLanguage = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLanguage);
    handleTranslation(currentText, fromLanguage, toLanguage);
  };

  const handleTranslation = (text, fromLang, toLang) => {
    if (!text) return;

    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en-GB|${toLang}`;
    console.log(`url :${apiUrl}`);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setText(data.responseData.translatedText);
        console.log(`data ---------- : ${data.responseData.translatedText}`);
        // onChange(data.responseData.translatedText);
      })
      .catch((error) => {
        console.error("Translation error:", error);
        setText("Translation Error");
      });
  };

  useEffect(() => {
    if (text.trim() !== "") {
      handleTranslation(fromLanguage, toLanguage);
    }
  }, [fromLanguage, toLanguage]);

  const languages = {
    "en-GB": "English",
    "gu-IN": "Gujarati",
    "hi-IN": "Hindi",
    "kn-IN": "Kannada",
    "pa-IN": "Panjabi",
    "te-IN": "Telugu",
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="text-input">
          <textarea
            spellCheck="false"
            className="single-textarea"
            placeholder="Type your text"
            value={text}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="language-dropdown">
          <select value={fromLanguage} onChange={handleLanguageChange}>
            {Object.keys(languages).map((country_code) => (
              <option key={country_code} value={country_code}>
                {languages[country_code]}
              </option>
            ))}
          </select>
        </div>
        <ul className="controls">
          <li className="row">
            <button onClick={handleExchange} className="btn btn-success">
              <i className="header-icon fa-solid fa-right-left"></i>
              Exchange Languages
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Translator;
