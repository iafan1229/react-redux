import React, { useState, forwardRef, useRef} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useImperativeHandle } from 'react'
import { useEffect } from 'react';

function Popup(props, ref) {
  const [on, setOn] = useState(false)
  const wrap = useRef(null)
  useImperativeHandle(ref, ()=>{
    return {
      show: ()=>{setOn(true)},
      unshow: ()=>{setOn(false)}
    }
  })
  useEffect(()=>{
    if(on) {
      document.body.style.overflow="hidden"
    } else {
      document.body.style.overflow="auto"
    }
  },[on])
  return (
    <AnimatePresence> 
       {(on)&&<motion.div 
            className="popup-wrap" ref={wrap}
            initial={{ opacity : 0, scale:0 }}
            animate={{ opacity : 1, scale:1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e)=>{
              if(e.target.className ==='popup') return
              setOn(false)}
            }
          >
          <div className="popup">
            {props.children}
          </div>
        </motion.div>}
     </AnimatePresence>
  )
}

export default forwardRef(Popup)
