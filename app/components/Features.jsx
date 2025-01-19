import { MessageSquare, Zap, Shield, Database, History, Settings } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-green-400" />,
      title: "Natural Language Processing",
      description: "Convert your everyday language into precise SQL queries without writing complex code"
    },
    {
      icon: <Zap className="h-10 w-10 text-green-400" />, 
      title: "Instant Query Generation",
      description: "Get optimized SQL queries in milliseconds with our advanced AI processing"
    },
    {
      icon: <Shield className="h-10 w-10 text-green-400" />,
      title: "Secure Connection", 
      description: "Enterprise-grade security for your database connections and queries"
    },
    {
      icon: <Database className="h-10 w-10 text-green-400" />,
      title: "Multiple Database Support",
      description: "Compatible with various NoSQL databases and schemas"
    },
    {
      icon: <History className="h-10 w-10 text-green-400" />,
      title: "Query History",
      description: "Track and reuse your previous queries with built-in history management"
    },
    {
      icon: <Settings className="h-10 w-10 text-green-400" />,
      title: "Custom Configuration",
      description: "Customize query parameters and output formats to match your needs"
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#262626]" style={{height: '780px'}}>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Powerful Features for Database Interaction</h2>
        <p className="text-gray-400 text-center mb-12">Transform your database queries into natural conversations</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={feature.title} className="bg-[#171717] rounded-lg p-6" style={{height: '232px'}}>
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
