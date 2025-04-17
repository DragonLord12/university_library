import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import React from 'react'
import { Session } from 'next-auth';
import { Button } from './ui/button';
import { signOut } from '@/auth';

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5 ">
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-2xl text-white font-semibold">BookWise</p>
      </Link>
      
      <ul className='flex flew-row items-center gap-8'>
        <li>
          <Link href="/" className={cn('text-base cursor-pointer capitalize text-light-100')}>Home</Link>
        </li>
        <li>
          <Link href="/search" className={cn('text-base cursor-pointer capitalize text-light-100')}>Search</Link>
        </li>
        <li className='flex gap-6'>
          <Link href="/my-profile" className={cn('text-base cursor-pointer capitalize flex gap-2 items-center')}>
            <Avatar>
              <AvatarFallback className="bg-amber-100 text-black font-semibold">{getInitials(session?.user?.name || "IN")}</AvatarFallback>
            </Avatar>
          </Link>

          <form action={async () => {
            "use server";

            await signOut();
          }}>
            <Button className="rounded-full p-1 h-fit" variant="ghost">
              <Image src="/icons/logout.svg" alt="logout" width={24} height={24} className='object-contain' />
            </Button>
          </form>
        </li>
      </ul>
    </header>
  )
}

export default Header