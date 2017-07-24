import React from 'react'
import Footer from './Footer'
import './Layout.css'

const Layout = (props) => (
  <div className="wrap">
    <section className="section">
      {props.children}
    </section>
    <Footer />
  </div>
)

export default Layout