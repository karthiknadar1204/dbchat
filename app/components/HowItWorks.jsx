export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Connect Your Database",
      description: "Securely connect your PostgreSQL database with a simple URL",
      method: "mongodb://your-database-url:27017"
    },
    {
      number: 2, 
      title: "Ask Questions",
      description: "Use natural language to query your database schema",
      method: "Show me all active users\nwho joined last month"
    },
    {
      number: 3,
      title: "Get Results", 
      description: "Receive instant SQL queries and visualized results",
      method: `SELECT * FROM users
WHERE status = 'active'
AND join_date >= DATE_SUB(NOW(),
INTERVAL 1 MONTH);`
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#171717]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">How It Works</h2>
        <p className="text-xl text-gray-400 text-center mb-8">Three simple steps to start chatting with your database</p>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative bg-[#262626] border-2 border-[#22c55e] rounded-lg p-8 w-full md:w-1/3 min-h-[200px]">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-lg text-gray-400">{step.description}</p>
              <div className="mt-4 bg-[#404040] rounded p-3">
                <code className="text-lg text-[#4ade80] whitespace-pre-wrap break-words">{step.method}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
