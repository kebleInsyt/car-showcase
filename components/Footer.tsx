import Link from "next/link"
import Image from "next/image"
import { footerLinks } from "@/contants"

const Footer = () => {
  return (
    <footer className='flex flex-col text-black-100 mt-5 border-t border-gray-100'>
        <div className='flex max-md:flex-col flex-wrap justify-between gap-5 px-6 py-10 sm:px-16'>
            <div className="flex flex-col justify-start items-start gap-6">
                <Image src='/logo.svg' alt='logo' width={118} height={18} className='object-contain'/>
                <p className='text-base text-gray-700'>
                    CarHub {new Date().getFullYear()} <br />
                    All rights reserved &copy
                </p>
            </div>

            <div className='footer__links'>
                {footerLinks.map(mainLink => (
                    <div key={mainLink.title} className='footer__link'>
                        <h3 className='font-bold'>{mainLink.title}</h3>
                        <div className="flex flex-col gap-5">
                            {mainLink.links.map(link => (
                                <Link key={link.title} href={link.url} className='text-gray-500'>
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}      
            </div>
        </div>

          <div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 px-6 py-10 sm:px-16'>
              <p>@{new Date().getFullYear()} CarHub<br /> All rights reserved</p>

              <div className='flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10'>
                <Link href='/' className='text-gray-500'>Privacy & Policy</Link>
                <Link href='/' className='text-gray-500'>Terms & Condition</Link>
              </div>
          </div>
    </footer>
  )
}

export default Footer