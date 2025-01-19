import { Database, MessageSquare, Code, BarChart } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: <Database className="h-12 w-12 text-green-400 mb-4" />,
      title: "Connect",
      description: "Connect your PostgreSQL database using a secure URL"
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-green-400 mb-4" />,
      title: "Chat",
      description: "Ask questions or request insights using natural language"
    },
    {
      icon: <Code className="h-12 w-12 text-green-400 mb-4" />,
      title: "Generate",
      description: "AI generates SQL queries based on your input"
    },
    {
      icon: <BarChart className="h-12 w-12 text-green-400 mb-4" />,
      title: "Visualize",
      description: "View results, visualizations, and insights instantly"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-black p-6 rounded-lg text-center">
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

