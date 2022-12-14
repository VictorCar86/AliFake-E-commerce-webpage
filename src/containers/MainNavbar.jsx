import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FiUser, FiShoppingCart, FiGrid, FiHome } from 'react-icons/fi'

const MainNavbar = () => {

  const svgStyles = "w-6 h-6 mx-auto";

  const { pathname } = useLocation();
  const routeExceptions = ['/product', 'account/wishlist', 'account/viewed'];
  const includeRoute = routeExceptions.some(route => pathname.includes(route));

  const avaliableScroll = () => {
    if (pathname === "/"){
      window.scrollTo(0,0);
    }
  }

  return (
    <nav className={`${includeRoute ? "hidden" : "block"} w-full max-w-md rounded-t-lg pt-1.5 fixed bottom-0 left-1/2 -translate-x-1/2 z-10 bg-gray-200`}>
        <ul className='flex justify-around gap-3 px-2.5 font-medium' >
            <li className={`${pathname === "/" ? "text-red-700" : ""}`} onClick={avaliableScroll}>
              <Link to={"/"}>
                <FiHome className={svgStyles} />
                <span>Home</span>
              </Link>
            </li>
            <li className={`${pathname === "/categories" ? "text-red-700" : ""}`}>
              <Link to={"/categories"}>
                <FiGrid className={svgStyles} />
                <span>Categories</span>
              </Link>
            </li>
            <li className={`${pathname === "/cart" ? "text-red-700" : ""}`}>
              <Link to={"/cart"}>
                <FiShoppingCart className={svgStyles} />
                <span>Cart</span>
              </Link>
            </li>
            <li className={`${pathname === "/account" ? "text-red-700" : ""}`}>
              <Link to={"/account"}>
                <FiUser className={svgStyles} />
                <span>Account</span>
              </Link>
            </li>
        </ul>
    </nav>
  )
}

export default MainNavbar