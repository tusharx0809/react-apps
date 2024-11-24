import React, {useState} from 'react'



export default function TextForm(props) {
    const handleUpClick = ()=>{
        console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase()
        setText(newText)
        props.showAlert("Converted to Uppercase!","success")
    }

    const handleLowClick = ()=>{
      console.log("Lowercase was clicked" + text);
      let newText = text.toLowerCase()
      setText(newText)
      props.showAlert("Converted to Lowercase!","success")
  }

    const handleFirstLetterCaps = ()=>{
      let new_text = text;
      let sentences = new_text.split(/([.?!]\s*)/);
      let result = "";

      for (let i = 0; i < sentences.length; i++){
        if (i % 2 === 0){
        result += sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
      } else {
        result += sentences[i];
      }
      setText(result)
      }
      props.showAlert("Converted First Letter to Uppercase!","success")
  }
    const ClearText = ()=>{
      let new_text = ""
      setText(new_text)
      props.showAlert("Text Cleared!","success")
    }
    const handleOnChange = (event)=>{
        console.log("On change");
        setText(event.target.value);
    }

    const [text, setText] = useState("");
    // text = "new text"; // Wrong way to change state
    // setText("next text") // correct way to change state
  return (
    <>
    <div className="container" style={{color: props.mode==="dark"?"white":"#042743", transition: "all 0.75s ease"}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==="dark"?"#13466e":"white",color: props.mode==="dark"?"white":"#042743", transition: "all 0.75s ease"}} id="myBox" rows="8"></textarea>
      </div>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>Convert to Lowercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleFirstLetterCaps}>First Letter Caps</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={ClearText}>Clear Text</button>
    </div>
    <div className="container my-3" style={{color: props.mode==="dark"?"white":"#042743", transition: "all 0.75s ease"}}>
      <h1>Yor text summary</h1>
      <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
      <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} minutes read</p>
      <h2>Preview</h2>
      <p>{text.length>0?text:"Nothin to preview"}</p>
    </div>
    </>
  )
}
