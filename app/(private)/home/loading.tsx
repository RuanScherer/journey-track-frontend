export default function HomeLoading() {
  return (
    <main className="flex flex-col items-stretch my-5 mx-auto p-1.5 max-w-5xl">
      <h1 className="text-2xl font-bold">Projects</h1>
      <p className="text-sm mt-1 leading-tight text-neutral-700">
        Here are all the projects you own or are a member of.
      </p>

      <ul className="space-y-[1px] mt-5">
        {[...Array(5)].map((_, i) => (
          <li
            key={i}
            className="bg-gray-200 bg-opacity-70 rounded h-11 animate-pulse"
          />
        ))}
      </ul>
    </main>
  )
}