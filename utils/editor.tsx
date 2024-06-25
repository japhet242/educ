import dynamic from 'next/dynamic';
import { type } from 'os';
import React, { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

interface editor {
  value:string | undefined,
  onChange:(value:string)=>void
}

export function Editeur({
  value,
  onChange
}:editor) {
    const ReactQuill = useMemo(()=>dynamic(()=>import("react-quill"),{
        ssr:false
    }),[])


  return <div className=' bg-white'>
   <ReactQuill theme="snow" value={value} onChange={onChange}/>
  </div>
  
}