import React, {useEffect, useRef} from 'react'

function Common({name, children}) {
  
  return (
    <section className={`visual ${name}`}>
      <div className="inner">
        {children}  
      </div>      
    </section>
  )
}
export default Common