import React from 'react'
import NotFoundImg from '../images/pagenotfound.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export const NotFound = () => {
    return (
        <div className='container'>
            <div className='error-wrapper'>
                <img src={NotFoundImg} alt="Page Not Found" className='w-96'/>
                <div>
                    <h1>OOPS! Page Not Found</h1>
                </div>
                <Link to="/" className='pay-btn !px-10 py-3'>
                    Go Back
                </Link>
            </div>
        </div>
    )
}
