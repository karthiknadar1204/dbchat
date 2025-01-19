import { Database, MessageSquare, Search } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Database className="h-10 w-10 text-green-400" />,
      title: "Connect Any PostgreSQL Database",
      description: "Easily connect to your existing PostgreSQL databases with a simple URL."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-green-400" />,
      title: "Natural Language Queries",
      description: "Ask questions about your data in plain English and get instant results."
    },
    {
      icon: <Search className="h-10 w-10 text-green-400" />,
      title: "AI-Powered Insights",
      description: "Gain deep insights from your data with AI-generated analysis and visualizations."
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

