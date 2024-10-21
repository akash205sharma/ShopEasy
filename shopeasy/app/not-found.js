import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-6xl font-bold text-green-600">404</h1>
        <p className="text-gray-600 text-xl mt-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        
        <img 
          src="/error-404.png" 
          alt="Page not found" 
          className="w-[200px] mx-auto my-8"
        />
        
        <p className="text-gray-500 mb-6">
          The page might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link href="/">
          <div className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition duration-300">
            Go Back Home
          </div>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage

