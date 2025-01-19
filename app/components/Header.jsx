import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { createOrUpdateUser } from '@/app/actions/user'
import { redirect } from 'next/navigation'

export default async function Header() {
  const user = await currentUser()
  
  if (user) {
    await createOrUpdateUser(user)
    redirect('/chat')
  }

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-400">SchemaChat</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link href="#features" className="hover:text-green-400">Features</Link></li>
            <li><Link href="#how-it-works" className="hover:text-green-400">How it Works</Link></li>
            <li><Link href="#contact" className="hover:text-green-400">Contact</Link></li>
            <SignedOut>
              <li>
                <SignInButton mode="modal">
                  <Button variant="outline" className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black">
                    Sign In
                  </Button>
                </SignInButton>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <Link href="/chat">
                  <Button variant="outline" className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black mr-4">
                    Go to Chat
                  </Button>
                </Link>
              </li>
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            </SignedIn>
          </ul>
        </nav>
      </div>
    </header>
  )
}
