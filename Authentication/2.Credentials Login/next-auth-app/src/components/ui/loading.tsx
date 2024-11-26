
const Loading = () => {
  return (
    <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute  border-8 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  )
}

export default Loading