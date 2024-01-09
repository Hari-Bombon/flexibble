"use client"
import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from '@/constants';
import AuthProviders from './AuthProviders';
import { useEffect, useState } from 'react';
import { getCurrentUser  } from '@/lib/session';
import { SessionInterface } from "@/common.types";


export const Navbar = () => {
  const [session, setSession] = useState<SessionInterface | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const userSession: SessionInterface = await getCurrentUser(); // Specify the type here
      setSession(userSession);
    };

    fetchSession();
  }, []);


  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href='/'>
          <Image
            src='/public/logo.svg' // Corrected path
            width={115}
            height={43}
            alt='Flexibble'
          />
        </Link>
      </div>
      <ul className='xl:flex hidden text-small gap-7'>
        {NavLinks.map((link) => (
          <li key={link.key}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
      <div className='flexCenter gap-4'>
      {session?.user ? (
  <>
    {session?.user?.image && (
      <Image
        src={session.user.image}
        width={40}
        height={40}
        className='rounded-full'
        alt={session.user.name}
      />
    )}
    <Link href='/create-project'>Share Work</Link>
  </>
) : (
  <AuthProviders />
)}

      </div>
    </nav>
  );
};
