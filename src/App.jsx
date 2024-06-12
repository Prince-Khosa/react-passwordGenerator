import React, { useCallback, useEffect, useRef, useState } from 'react'
function App() {
  const [length, setlength] = useState(8)
  const [charAllowed, setcharAllowed] = useState(false)
  const [numAllowed, setnumAllowed] = useState(false)
  const [password, setpassword] = useState("")
  const passGen = useCallback(
    () => {
      let pass = ""
      let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
      if(numAllowed){
        str += "1234567890"
      }
      if(charAllowed){
        str+= "`~!@#$%^&*()-_=+[{]};:',<.>/?"
      }
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char)
      }
      setpassword(pass)
    },
    [length,charAllowed,numAllowed,setpassword]//we parse dependencies as an array of values that will cause the callback. matlb hum inmese kuch bi change karenge toh function apne aap call ho jaye ga..
  )
  useEffect(() => {
    passGen()
  },
  [length,charAllowed,numAllowed,passGen]//we parse dependencies as an array of values that will cause the callback. matlb hum inmese kuch bi change karenge toh function apne aap call ho jaye ga..
  )

  const copyPass = useCallback(()=>{
    passRef.current?.select();//to see what we copied..
    // passRef.current?.setSelectionRange(0, 4);
    window.navigator.clipboard.writeText(password)
  },[password])

  const passRef = useRef(null)//useref is used to access the DOM element directly..

  return (
    <>
     <div className=' w-full max-w-md bg-slate-700 mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500'>
      <h1 className=' text-white text-center'>Password Generator</h1>
      <div className='flex rounded-lg overflow-hidden mb-4  my-4'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3' 
          placeholder='Password'
          readOnly
          ref={passRef}
        />
        <button
        onClick={copyPass}
        className=' bg-blue-700 text-white outline-none px-3 py-1'>Copy</button>
      </div>
      <div className=' flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-2'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className=' cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          Length = {length}
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numbers"
            onChange={()=>{
              setnumAllowed((p)=>!p)
            }}
          />
          Add No.s
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="chars"
            onChange={()=>{
              setcharAllowed((p)=>!p)
            }}
          />
          Add Chars
        </div>
      </div>
     </div>
    </>
  )
}

export default App