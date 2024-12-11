import React from 'react'

export  function Foot() {
  return (
    <div>
        <footer className="footer footer-dark">
            <div className="d-flex justify-content-between px-5">
                <div>ALL RIGHTS RESERVED BRS STUDIO, INDIA</div>
                
                <div>
                    <img src="data:image/png;base64,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" alt="logo" />
                </div>
            </div>
        </footer>
    </div>
  )
}
