import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
        <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg">
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <Input id="name" type="text" placeholder="Your Name" className="bg-black text-white" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" className="bg-black text-white" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <Textarea id="message" placeholder="Your message" className="bg-black text-white" rows={4} />
            </div>
            <Button type="submit" className="w-full bg-green-400 text-black hover:bg-green-500">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

