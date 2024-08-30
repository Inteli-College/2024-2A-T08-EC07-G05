'use client';

import Image from 'next/image';

export default function BaseButton({ text, icon, onClick }) {
  return (
    <button 
      onClick={onClick}
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-2xl px-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2"
    >
      {icon && <Image src={icon} alt="icon" width={20} height={20} />}
      {text}
    </button>
  );
}
