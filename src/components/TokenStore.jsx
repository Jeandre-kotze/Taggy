import Wrapper from "./Wrapper"

const TokenStore = () => {
  return (
    <Wrapper>
        <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="outline outline-1 w-48 h-52 rounded-md flex flex-col p-2 gap-1 bg-white">
            <h2 className="text-center h-10 text-lga">20$</h2>
            <img className="w-full h-32 rounded-lg" src="/taggicoins.webp" alt="" />
            <button className="bg-white p-1 rounded-lg">Buy</button>
        </div>
        </div>
    </Wrapper>
  )
}

export default TokenStore