import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-400 text-black">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Chat with Your Database?</h2>
        <p className="text-xl mb-8">Start gaining insights from your PostgreSQL data using natural language today.</p>
        <Button className="bg-black text-green-400 hover:bg-gray-800">Get Started with SchemaChat</Button>
      </div>
    </section>
  )
}

