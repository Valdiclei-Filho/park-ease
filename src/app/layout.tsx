import type {Metadata}
from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ResponsiveAppBar} from '../components/_ui/Header/index';
import {Footer} from '../components/_ui/Footer/index';
import CarsAll from '../app/veiculo/page';

const geistSans = localFont(
    {src: "./fonts/GeistVF.woff", variable: "--font-geist-sans"}
);
const geistMono = localFont(
    {src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono"}
);

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};

export default async function RootLayout({children} : Readonly < {
    children: React.ReactNode;
} >) {

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
                <div className="flex flex-col min-h-screen">
                    <ResponsiveAppBar/>
                    <main
                        className="flex-grow flex flex-col gap-8 row-start-2 items-center sm:items-start">
                            <CarsAll></CarsAll>
                        </main>
                    <Footer/>
                </div>
            </body>
        </html>
    );
}
