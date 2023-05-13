import { FaPause } from 'react-icons/fa';
import { FaBorderNone } from 'react-icons/fa';
import {  useState } from 'react';

export default function Home({advice}) {
  const [currentAdvice, setCurrentAdvice] = useState(advice);

  const fetchNewAdvice = async () => {
    try {
      const data = await fetch('https://api.adviceslip.com/advice');
      const result = await data.json();
      setCurrentAdvice(result.slip);
      
    } catch (error) {
      console.error(error);
      alert('There was an error fetching advice.');
    }
  };


  return (
    <main className="flex min-h-screen w-full bg-slate-900 items-center justify-center">
      <div className="relative lg:w-1/3 w-2/3 bg-slate-700 h-1/3 rounded-lg sm:p-14 px-6 py-14 flex items-center flex-col gap-6 text-center sm:text-left">
        <p className="text-green-300 text-sm font-semibold tracking-[0.3rem]">
          ADVICE #{currentAdvice.id}
        </p>
        <h2 className="text-2xl text-neutral-300 font-bold">
          {currentAdvice.advice}
        </h2>
        <div className="w-full flex justify-center items-center relative before:content-[''] before:w-[45%] before:h-[0.3px] before:bg-neutral-500 before:absolute before:left-0 after:content-[''] after:w-[45%] after:h-[0.3px] after:bg-neutral-500 after:absolute after:right-0">
          <FaPause className="text-neutral-300 text-xl" />
        </div>
        <div
          className="absolute bottom-[-2rem] p-6 bg-green-300 rounded-full cursor-pointer"
          onClick={fetchNewAdvice}
        >
          <FaBorderNone className="bg-black rounded text-green-300" />
     </div>
      </div>
    </main>
  );
}

export const getStaticProps = async() =>{
  const data = await fetch("https://api.adviceslip.com/advice");
  const result = await data.json();

  return {
    props: {
      advice: result.slip
    }
  }
}