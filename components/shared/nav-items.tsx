"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { headerLinks } from '@/constants'

const NavItems = () => {

  const pathName = usePathname()

  return (
    <ul className='md:flex-between flex w-full max-md:flex-col items-start '>
      {headerLinks.map((link) => {
        const isActive = pathName === link.route;
        return (
          <li key={link.route} className={`${isActive && "text-primary-500"} flex-center p-medium-16 whitespace-nowrap`}>
            <Link href={link.route}>
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems