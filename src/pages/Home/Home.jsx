import { useEffect, useState } from "react";
import { MEDICAL_API_URL, MEDICAL_API_SERVICEKEY } from "../../common/apiConfig";
import axios from "axios";
import noImg from "../../assets/noImg.png";

function Home() {
    useEffect(() => {
        const sendAxios = async () => {
            var url = MEDICAL_API_URL; /*URL*/
            var queryParams = `?serviceKey=${MEDICAL_API_SERVICEKEY}`; /*Service Key*/
            queryParams += '&pageNo=1'; /**/
            queryParams += '&numOfRows=3'; /**/
            queryParams += '&type=json';
    
            const response = await axios.get(url + queryParams);
            console.log(response);
    
            const items = response.data.body.items;
            console.log(items);
            setItemArray(items);
        };
        sendAxios();
    }, []);

    const [itemArray, setItemArray] = useState([]);

    const [keyWord, setKeyWord] = useState("");

    const searchBtnClick = () => {
        const sendAxios = async () => {
            var url = MEDICAL_API_URL; /*URL*/
            var queryParams = `?serviceKey=${MEDICAL_API_SERVICEKEY}`; /*Service Key*/
            queryParams += '&pageNo=1'; /**/
            queryParams += '&numOfRows=3'; /**/
            queryParams += '&type=json'
            queryParams += `&efcyQesitm=${keyWord}`;
    
            const response = await axios.get(url + queryParams);
            console.log(response);
    
            const items = response.data.body.items;
            console.log(items);
            setItemArray(items);
        };
        sendAxios();
    }

    return(
        <div>
            <div className="flex flex-col justify-center text-start py-16 px-70 w-350">
                <span className="text-2xl font-bold"> 어디가 불편하신가요? </span>
                <span className="text-gray-400 text-sm mt-3"> 증상을 입력하시면 필요한 의약품을 알려드립니다. </span>
                <div className="mt-2">
                    <input value={keyWord} onChange={(e) => setKeyWord(e.target.value)} type="text" className="border-3 border-blue-400 w-160 h-9 outline-none"/>
                    <button className="bg-blue-400 w-30 h-9 px-2 py-1 text-white" onClick={searchBtnClick}> 전송 </button>
                </div>
            </div>
            <div className="flex text-start px-24">
                <span className="text-blue-400 font-bold"> 최근 출시된 의약품 </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 px-28">
                {itemArray.map((data) => (
                <div key={data.bizrno} className="shadow rounded-xl">
                    <div className="rounded-t-xl overflow-hidden h-2/3">
                        <img className="h-full" src={data.itemImage ? data.itemImage : noImg} alt="" />
                    </div>
                    <div className="border-t border-t-black h-20 py-5">
                        <p className="text-xl"> {data.entpName} </p>
                        <p className="mt-3"> {data.itemName.length > 14 ? data.itemName.substring(0,14) : data.itemName} </p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Home;