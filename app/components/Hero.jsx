import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#171717]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Chat with your<br />
            <span className="text-[#4ade80]">database schema</span><br />
            in natural<br />
            language
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-[#9ca3af] max-w-full">
            Transform your database queries from complex SQL to simple conversations.
            Just connect your NoSQL database
            and start chatting!
          </p>
          <Link href="/chats">
            <Button className="bg-green-400 text-black hover:bg-green-500 text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8">Try SchemaChat Now</Button>
          </Link>
        </div>
        <div className="lg:w-1/2 w-full overflow-x-auto lg:overflow-visible">
          <div className="bg-[#262626] p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-[584px] h-auto sm:h-[292px] mx-auto lg:-ml-8">
            <div className="flex items-center mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-[#404040] w-full sm:w-[536px] h-auto min-h-[56px] rounded-lg p-4 mb-4">
              <div className="text-[#4ade80] break-words">You: Show me all users who signed up last month</div>
            </div>
            <div className="bg-[#404040] w-full sm:w-[536px] h-auto min-h-[144px] rounded-lg p-4">
              <div className="text-white">
                <div className="mb-2">Generated SQL:</div>
                <pre className="font-mono text-xs sm:text-sm text-[#4ade80] whitespace-pre-wrap break-words">
                  {`SELECT * FROM users
WHERE signup_date >= DATE_TRUNC('month', CURRENT_DATE -
INTERVAL '1' MONTH)
AND signup_date < DATE_TRUNC('month', CURRENT_DATE);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
