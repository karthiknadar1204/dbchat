import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Clock, Instagram, Twitter, Facebook, Github } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#171717]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Form Container */}
          <div className="w-full lg:w-1/2 bg-[#262626] p-12 rounded-lg">
            <form>
              <div className="mb-8">
                <label htmlFor="name" className="block text-lg font-medium text-gray-400 mb-2">Name</label>
                <Input id="name" type="text" placeholder="Your Name" className="bg-[#262626] text-white h-14 text-lg" />
              </div>
              <div className="mb-8">
                <label htmlFor="email" className="block text-lg font-medium text-gray-400 mb-2">Email</label>
                <Input id="email" type="email" placeholder="your@email.com" className="bg-[#262626] text-white h-14 text-lg" />
              </div>
              <div className="mb-8">
                <label htmlFor="query-type" className="block text-lg font-medium text-gray-400 mb-2">Query Type</label>
                <Select>
                  <SelectTrigger className="bg-[#262626] text-white h-14 text-lg">
                    <SelectValue placeholder="Select query type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Query</SelectItem>
                    <SelectItem value="billing">Billing Support</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="block text-lg font-medium text-gray-400 mb-2">Message</label>
                <Textarea id="message" placeholder="Your message" className="bg-[#262626] text-white text-lg" rows={6} />
              </div>
              <Button type="submit" className="w-full bg-green-400 text-black hover:bg-green-500 h-16 text-xl">Send Message</Button>
            </form>
          </div>

          {/* Right Info Containers */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="w-full bg-[#262626] p-12 rounded-lg">
              <div className="flex items-center gap-4 mb-8">
                <Mail className="h-6 w-6 text-green-400" />
                <span className="text-[#9ca3af] text-md">karthiknadar1204@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 mb-8">
                <MapPin className="h-6 w-6 text-green-400" />
                <span className="text-[#9ca3af] text-md">123 Database Street<br />Query City, SC 12345</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-green-400" />
                <span className="text-[#9ca3af] text-md">Mon - Fri: 9:00 AM - 6:00 PM<br />Weekend: Closed</span>
              </div>
            </div>

            <div className="w-full bg-[#262626] p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-center">Follow Us</h3>
              <div className="flex justify-center gap-6">
                <Instagram className="h-8 w-8 text-[#16a34a] hover:scale-110 transition-transform cursor-pointer" />
                <Twitter className="h-8 w-8 text-[#16a34a] hover:scale-110 transition-transform cursor-pointer" />
                <Facebook className="h-8 w-8 text-[#16a34a] hover:scale-110 transition-transform cursor-pointer" />
                <Github className="h-8 w-8 text-[#16a34a] hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
