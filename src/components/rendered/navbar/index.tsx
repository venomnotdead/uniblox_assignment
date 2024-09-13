"use client"
import React from 'react';
import Link from 'next/link';
import { routes } from './routes';
import useScreenSizeHook from '@/hooks/useScreenSizeHook';

const Navbar: React.FC = () => {
    const { screenType } = useScreenSizeHook()
    if (screenType == "mobile") {
        return (
            <nav className="bg-secondary p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="space-x-4">
                        {
                            routes.map((route, index) => {
                                return (<Link href="/" key={index} className="text-white hover:text-gray-300">
                                    {route.name}
                                </Link>)
                            })
                        }
                    </div>
                </div>
            </nav>
        )
    }
    return (
        <nav className="bg-secondary p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-background text-2xl font-bold">
                    <Link href="/" className="hover:text-gray-300">
                        MyApp
                    </Link>
                </div>
                <div className="space-x-4">
                    {
                        routes.map((route, index) => {
                            return (<Link href="/" key={index} className="text-white hover:text-gray-300">
                                {route.name}
                            </Link>)
                        })
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
