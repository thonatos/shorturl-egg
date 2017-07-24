import React from 'react'

const year = new Date().getFullYear()
export default () => (
  <div id="footer">
    <div className="container footer">
      <p>
        Released Under the MIT License <br />
      </p>
      <p>
        Copyright © {year} . <a href="https://www.thonatos.com/#/">SuYI.</a>
      </p>
      <p>
        Maintained BY . <a href="https://github.com/MT-Libraries/">MT-Libraries</a>
      </p>
    </div>
  </div>
)