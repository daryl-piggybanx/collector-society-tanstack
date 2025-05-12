import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-slate-950 backdrop-blur-sm justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold hover:text-red-600 transition-all">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold hover:text-red-600 transition-all">
          <Link to="/collector/new">Collector Form</Link>
        </div>

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
