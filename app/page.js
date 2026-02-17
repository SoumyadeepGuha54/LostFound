export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Campus Lost & Found</span>
            </div>
            <div className="flex gap-3">
              <a href="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Login
              </a>
              <a href="/signup" className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero */}
          <div className="text-center py-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Never Lose Track of Your
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Belongings</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              The smart way to reunite lost items with their owners. Our AI-powered platform connects students 
              within your college community to find what matters most.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/signup" className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                Get Started Free
              </a>
              <a href="#features" className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-lg hover:border-gray-400 transition-all">
                Learn More
              </a>
            </div>
          </div>

          {/* Features */}
          <div id="features" className="py-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Campus Lost & Found?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Matching</h3>
                <p className="text-gray-600">
                  Smart algorithms automatically suggest potential matches between lost and found items, saving you time and effort.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Location Tags</h3>
                <p className="text-gray-600">
                  Pin exactly where you lost or found an item with interactive maps to help others locate it quickly.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">College-Specific</h3>
                <p className="text-gray-600">
                  Only see posts from your college community. Secure, private, and tailored to your campus.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="py-20 bg-gray-50 -mx-4 px-4 rounded-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-bold text-gray-900 mb-2">Sign Up</h3>
                <p className="text-gray-600 text-sm">Create account with your college email</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-bold text-gray-900 mb-2">Post Item</h3>
                <p className="text-gray-600 text-sm">Upload photos and details of lost/found items</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-bold text-gray-900 mb-2">Get Matches</h3>
                <p className="text-gray-600 text-sm">AI suggests potential matches automatically</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-bold text-gray-900 mb-2">Connect</h3>
                <p className="text-gray-600 text-sm">Comment and reunite with your belongings</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="py-20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">1000+</div>
                <p className="text-gray-600">Items Recovered</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
                <p className="text-gray-600">College Partners</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
                <p className="text-gray-600">Match Accuracy</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="py-20 text-center">
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Find Your Lost Items?
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Join thousands of students who never lose track of their belongings.
              </p>
              <a href="/signup" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                Sign Up Now - It's Free!
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold text-white">Campus Lost & Found</span>
          </div>
          <p className="mb-4">Making campuses safer, one found item at a time.</p>
          <p className="text-sm">&copy; 2026 Campus Lost & Found. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
