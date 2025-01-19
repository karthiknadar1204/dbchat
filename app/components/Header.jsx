import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-400">SchemaChat</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="#features" className="hover:text-green-400">Features</Link></li>
            <li><Link href="#how-it-works" className="hover:text-green-400">How it Works</Link></li>
            <li><Link href="#contact" className="hover:text-green-400">Contact</Link></li>
            <li><Button variant="outline" className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black">Get Started</Button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

