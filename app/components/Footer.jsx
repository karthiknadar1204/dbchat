import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-green-400 font-bold text-lg mb-4">SchemaChat</h3>
            <p className="text-gray-400">Empowering data insights through natural language.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-400 hover:text-green-400">Features</Link></li>
              <li><Link href="#how-it-works" className="text-gray-400 hover:text-green-400">How It Works</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-green-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-green-400">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SchemaChat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

