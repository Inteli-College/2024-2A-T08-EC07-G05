'use client';
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex items-center p-4 gap-4">
        <Button
          className='bg-blue-500 hover:bg-blue-600 text-white'
          onClick={() => window.location.href = '/'}
        >
          <img src="/icone_home.svg" className='w-5' alt="Home Icon"></img>
        </Button>
        <Link 
          href="/history"
          className={`${pathname === '/history' ? 'font-bold text-blue-500 underline' : ''} hover:text-blue-400 hover:underline`}
        >
          Histórico de registros
        </Link>
        <Link 
          href="/prediction"
          className={`${pathname === '/prediction' ? 'font-bold text-blue-500 underline' : ''} hover:text-blue-400 hover:underline`}
        >
          Predição de falhas
        </Link>
        <Link 
          href="/analysis"
          className={`${pathname === '/analysis' ? 'font-bold text-blue-500 underline' : ''} hover:text-blue-400 hover:underline`}
        >
          Análise de falhas
        </Link>
        <Link 
          href="/data"
          className={`${pathname === '/data' ? 'font-bold text-blue-500 underline' : ''} hover:text-blue-400 hover:underline`}
        >
          Dados do Modelo
        </Link>
        <Link 
          href="/models"
          className={`${pathname === '/models' ? 'font-bold text-blue-500 underline' : ''} hover:text-blue-400 hover:underline`}
        >
          Treino de Modelos
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
