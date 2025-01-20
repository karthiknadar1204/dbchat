import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#262626] text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Chat with Your Database?</h2>
        <p className="text-2xl mb-8">Start gaining insights from your PostgreSQL data using natural language today.</p>
        <Link href="/chats">
          <Button className="bg-green-400 text-black hover:bg-green-500 text-xl py-6 px-8">Get Started with SchemaChat</Button>
        </Link>
      </div>
    </section>
  )
}
