"use client";
import { useState } from "react";
import Integrations from "@/Components/Integrations";
import ChatBot from "@/Components/ChatBot";
import { Syne } from "next/font/google";
import { Sora } from "next/font/google";
import { Chakra_Petch } from "next/font/google";

const font = Syne({
    subsets: ["latin"],
    weight: ["600"],
});

export default function Navbar() {

    const [section, setSection] = useState(<Integrations />);

    const integrationOps = () => {
        setSection(<Integrations />);
    };

    const chataiOps = () => {
        setSection(<ChatBot />);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 h-[110px] w-screen p-[10px] border-b-[0.5px] border-b-gray-200 bg-white">
                <div className="h-[50px] flex items-center justify-between px-[10px]">
                    <div className="flex flex-row gap-[20px]">
                        <p className={font.className}>Metarise</p>
                        <p className="text-gray-600">/</p>
                        <div className="flex flex-row gap-[10px]">
                            <p id="username"></p>
                            <p className="bg-gray-200 rounded-full h-[22px] w-[80px] text-center text-[14px]">Free Trial</p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <p className="h-[40px] w-[120px] border-[3px] border-gray-200 flex items-center justify-center rounded-[5px] hover:bg-gray-200 cursor-pointer transition-all duration-300">Feedback</p>
                        <p className="h-[40px] w-[100px] flex items-center justify-center text-gray-600 hover:text-black cursor-pointer transition-all duration-200">Changelog</p>
                        <p className="h-[40px] w-[50px] flex items-center justify-center text-gray-600 hover:text-black cursor-pointer transition-all duration-200">Docs</p>
                        <img src="https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D" className="h-[35px] w-[35px] rounded-full ml-[25px] mr-[10px] cursor-pointer" />
                    </div>
                </div>
                <div className="h-[50px] flex flex-row items-center">
                    <button className="h-[40px] w-[100px] text-gray-600 text-center flex items-center justify-center hover:bg-gray-200 hover:rounded-[5px] hover:h-[35px] hover:w-[100px] hover:text-black cursor-pointer transition-all duration-300" onClick={integrationOps}>Integrations</button>
                    <button className="h-[40px] w-[80px] text-gray-600 text-center flex items-center justify-center hover:bg-gray-200 hover:rounded-[5px] hover:h-[35px] hover:w-[80px] hover:text-black cursor-pointer transition-all duration-300" onClick={chataiOps}>ChatAI</button>
                    <p className="h-[40px] w-[100px] text-gray-600 text-center flex items-center justify-center hover:bg-gray-200 hover:rounded-[5px] hover:h-[35px] hover:w-[100px] hover:text-black cursor-pointer transition-all duration-300">Monitoring</p>
                    <p className="h-[40px] w-[100px] text-gray-600 text-center flex items-center justify-center hover:bg-gray-200 hover:rounded-[5px] hover:h-[35px] hover:w-[100px] hover:text-black cursor-pointer transition-all duration-300">Analytics</p>
                </div>
            </div>
            {section}
        </>
    );
};