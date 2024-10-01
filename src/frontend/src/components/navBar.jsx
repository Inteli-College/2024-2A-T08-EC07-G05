'use client'
import React from 'react';
import Link from "next/link";
import {Button } from "@/components/ui/button";

const NavBar = () => {

  const homeClick = () => {
    window.location.href = '/';
  };

  return (
    <>
    <nav className="flex flex-start items-center p-4 gap-4">
        <Button className='bg-blue-500 hover:bg-blue-60 text-white' onClick={homeClick}>
          <img src="/icone_home.svg" className='w-5'></img>
        </Button>
          <Link 
          href="/history">
            Histórico de registros</Link>
            <Link 
          href="/prediction">
            Predição de falhas</Link>
            <Link 
          href="/analysis">
            Análise de falhas</Link>
            <Link 
          href="/data">
            Dados do Modelo</Link>
            <Link 
          href="/models">
            Treino de Modelos</Link>
        </nav>
    </>
  );
};

export default NavBar;
