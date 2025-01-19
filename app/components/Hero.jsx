import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl font-bold mb-6">Chat with Your PostgreSQL Database</h1>
          <p className="text-xl mb-8 text-gray-300">Use natural language to query your database, generate SQL, and gain insights effortlessly.</p>
          <Button className="bg-green-400 text-black hover:bg-green-500">Try SchemaChat Now</Button>
        </div>
        <div className="lg:w-1/2 max-w-md">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-green-400 text-sm mb-2">Example Query:</div>
            <div className="bg-black p-4 rounded min-h-[200px] flex items-center overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap break-words w-full">
                <code className="block">
SELECT 
  product_name,
  SUM(quantity) as total_sold
FROM sales
GROUP BY product_name
ORDER BY total_sold DESC
LIMIT 5;
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
