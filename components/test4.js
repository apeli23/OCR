import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';

function Test4() {
  const [result, setResult ] = useState('')
  const string = "@ The world of Moses had an( t@ abundance of leather sheets . /32)T"

  useEffect(() => {
    setResult(string.replace(/[^a-zA-Z ]/g, ""))

  }, [])
  return (
    <div>
      <h2>{result}</h2>
    </div>
  );
}
export default Test4;
