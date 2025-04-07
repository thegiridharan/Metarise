"use client";
import { useState, React } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip, IconButton, Alert, Button, Snackbar } from "@mui/material";

/**
 * Integrations Component is down below.
**/

export default function Integrations() {

    const [account, setAccount] = useState("");
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState("");
    const [loadData, setLoadData] = useState(false);

    const getRepos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/github/${account}`);
            setData(response.data);
            console.log(data);

            if (data.status === "404" || data.message === "Not Found") {
                setLoadData(false);
                setLoading(false);
                setAlert(true);
                return;
            };

            setLoadData(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        };
    };

    const removeInput = () => {
        setAccount("");
        document.getElementById("inputData").value = "";
    };

    return (
        <>
            <div className="mt-[110px] bg-gradient-to-r from-gray-100 to-gray-300">
                <Snackbar
                    open={alert}
                    autoHideDuration={3000}
                    onClose={() => setAlert(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert onClose={() => setAlert(false)}
                        severity="error">Repository not found!
                    </Alert>
                </Snackbar>
                <div>
                    <div className="h-[200px] flex items-center justify-center gap-[10px]">
                        <div className="md:w-[600px] flex flex-row items-center justify-center gap-[10px] outline-1 outline-gray-400 h-[45px] bg-white px-[10px] rounded-[5px] hover:outline-2 hover:outline-gray-400 hover:shadow-2xs">
                            <Search className="w-5 h-5 text-gray-500" />
                            <input id="inputData" type="text" placeholder="GitHub Username" value={account} onChange={(e) => setAccount(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") getRepos() }} className="p-[5px] rounded-[5px] w-[600px] bg-white border-none focus:outline-none" />
                            <IconButton onClick={removeInput}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className="w-[200px]">
                            <Tooltip title="Fetch your concern account" placement="top" arrow>
                                <Button variant="contained" sx={{ backgroundColor: "black", textTransform: "none", height: "45px", width: "190px" }} onClick={getRepos} loading={loading} loadingPosition="start">Fetch Repositories</Button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="flex items-center justify-evenly">
                        <div>
                            <div className="h-[60px] flex flex-row items-center justify-between px-[10px] bg-gray-200 rounded-[5px]">
                                <p className="text-black h-[40px] p-[5px] text-center font-semibold rounded-full flex items-center justify-center">Explore Repositories</p>
                            </div>
                            <div className="w-[600px] h-[400px] overflow-y-auto shadow-md p-[20px] flex flex-col gap-[5px] border-[0.5px] border-gray-200 bg-gray-50 rounded-[5px]">
                                {
                                    Array.isArray(data) && data.map((item, index) =>
                                    (
                                        <div key={index}>
                                            <p className="hover:text-black cursor-pointer hover:bg-gray-200 p-[10px] rounded-[5px] transition-all duration-300 text-gray-600" onClick={() => setIndex(index)}>{item.name}</p>
                                        </div>
                                    )
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <div className="h-[60px] flex flex-row items-center justify-between px-[10px] bg-gray-200 rounded-[5px]">
                                <p className="text-black h-[40px] p-[5px] text-center font-semibold rounded-full flex items-center justify-center">Deployed Status</p>
                            </div>
                            <div className="w-[500px] overflow-y-auto shadow-md p-[20px] flex flex-col gap-[5px] border-[0.5px] border-gray-200 rounded-[5px] bg-gray-50">
                                <div className="h-[370px] flex flex-col gap-[15px] overflow-y-auto">
                                    {
                                        index !== null && Array.isArray(data) &&
                                        <div className="h-[370px]">
                                            <div className="h-[90%]">
                                                <p>{data[index].name}</p>
                                                <a href={`${data[index].homepage}`} target="_blank" rel="noopener noreferrer" className="underline-offset-2 underline">{data[index].homepage}</a>
                                            </div>
                                            <div className="h-[10%]">
                                                <button className="text-white bg-black font-medium h-[40px] w-[150px] rounded-[5px] cursor-pointer">Import</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};