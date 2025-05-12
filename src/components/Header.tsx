import { Link } from '@tanstack/react-router'
import logo from '/logo-white.png'
import logoHover from '/logo-red.png'
import { useState } from 'react'

export default function Header() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 p-2 flex gap-2 bg-transparent backdrop-blur-sm justify-center z-[100]">
      <nav className="flex flex-row items-center">
        <div className="px-2 font-bold">
          <Link 
            to="/" 
            className="block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src={isHovered ? logoHover : logo} 
              alt="PiggyBanx Logo" 
              className="h-20 w-[200px] object-contain transition-opacity duration-200" 
            />
          </Link>
        </div>

        {/* <div className="px-2 font-bold hover:text-red-600 transition-all">
          <Link to="/collector/collector-form">Collector Form</Link>
        </div> */}

        {/* <div className="px-2 font-bold">
          <Link to="/demo/form/address">Address Form</Link>
        </div> */}
        {/* <div className="px-2 font-bold">
          <Link to="/demo/form/simple">Simple Form</Link>
        </div>



        <div className="px-2 font-bold">
          <Link to="/demo/start/server-funcs">Start - Server Functions</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/start/api-request">Start - API Request</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div> */}
      </nav>
    </header>
  )
}
