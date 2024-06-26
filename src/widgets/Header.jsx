import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <span className="md:ml-3 text-xl">O-LANGE</span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <Link to="/" className="mr-5 hover:text-gray-900">홈</Link>
                <Link to="/showcase" className="mr-5 hover:text-gray-900">시연</Link>
                <Link to="/about" className="hover:text-gray-900">소개</Link>
            </nav>
            <Link to="/showcase">
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">체험하기
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 md:ml-1" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
              </button>
            </Link>
        </div>
    </header>
  )
}

export default Header
