import React from 'react'

function Showcase() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded-lg shadow-lg" alt="hero" src="https://dummyimage.com/720x600"/>
        <div className="text-center lg:w-2/3 w-full">
          <p className="mb-8 leading-relaxed text-lg">번역을 시작해 주세요</p>
          <input 
            type="text" 
            id="message" 
            name="message" 
            className="w-full lg:w-2/3 mx-auto bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out mb-4"
          />
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg transition duration-200 ease-in-out transform hover:scale-105">음성</button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-8 focus:outline-none hover:bg-gray-200 rounded text-lg transition duration-200 ease-in-out transform hover:scale-105">문자</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Showcase
