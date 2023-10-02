import { useState , useCallback, useRef ,useEffect } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  //useRef
  const passwordRef = useRef(null);

  //function for rendom password generator at a time this function used 4 components
  const passwordGenrator = useCallback(()=>{
    let pass =" ";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
      str += "0123456789";
    }
    if(charAllowed) str += "$@!^&)*+_/{}[]~`#";
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);

  //this function automatically called on the browser reload
  useEffect(()=>{
    passwordGenrator();
  },[length,numberAllowed,charAllowed,setPassword]);

  //copy Button
  const handleCopyClick = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
      alert('Copied to clipboard');
    }
  };

  return (
    <>
    <div className='w-full h-screen max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 style={{textAlign:'center',marginTop:'10px'}}>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
           <input type="text" 
            value={password} 
            className='outline-none w-full py-1 px-3' 
            placeholder='password' 
            readOnly
            ref={passwordRef}
                />
           <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={handleCopyClick}>Copy</button>
       </div>
       
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
              <input type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer' 
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label>Length :{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={(e)=>{setNumberAllowed((prev)=>!prev);}} />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={charAllowed}
            id='charInput'
            onChange={(e)=>{setCharAllowed((prev)=>!prev);}} />
            <label>Char</label>
          </div>

        </div>
       
        
    </div> 
    </>
  )
}

export default App