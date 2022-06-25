import React from 'react'

function Wrap({name,children}) {
  return (
    <section className={name}>
        {children}
    </section>
  )
}

export default Wrap