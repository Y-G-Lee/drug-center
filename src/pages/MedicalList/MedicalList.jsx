import { useEffect, useState } from "react";
import {
  MEDICAL_API_URL,
  MEDICAL_API_SERVICEKEY,
} from "../../common/apiConfig";
import axios from "axios";
import noImg from "../../assets/noImg.png";

function MedicalList() {
  const [keyWord, setKeyWord] = useState("");

  const [itemArray, setItemArray] = useState([]);

  const [numArray, setNumArray] = useState([1,2,3,4,5,6,7,8,9,10]);

  const [page, setPage] = useState(1);

  const [finalPage, setFinalPage] = useState();

  const [reqParam, setReqParam] = useState("efcyQesitm");

  const [option, setOption] = useState("");

  useEffect(() => {
    const sendAxios = async () => {
      var url = MEDICAL_API_URL; /*URL*/
      var queryParams = `?serviceKey=${MEDICAL_API_SERVICEKEY}`; /*Service Key*/
      queryParams += `&pageNo=${page}`; /**/
      queryParams += "&numOfRows=9"; /**/
      queryParams += "&type=json";
      queryParams += `&${reqParam}=${keyWord}`;

      const response = await axios.get(url + queryParams);
      console.log(response);

      const items = response.data.body.items;
      console.log(items);
      setItemArray(items);

      const final = response.data.body.totalCount;
      const totalPage = Math.ceil(final / 9);
      setFinalPage(totalPage)

      const newPageNumArray = [];
      const start = Math.floor((page - 1) / 10) * 10 + 1;
      const end = Math.min(start + 9, totalPage);

      for(let i = start; i <= end; i++) {
        newPageNumArray.push(i);
      }
      setNumArray(newPageNumArray);
    };
    sendAxios();
  }, [page,option]);

  const searchBtnClick = () => {
    setOption({});
    setPage(1);
  };

  const firstPage = () => {
    setPage(1);
    setNumArray([1,2,3,4,5,6,7,8,9,10]);
  }

  const lastPage = () => {
    setPage(finalPage);
  }

  const prevPage = () => {
    if(page <= 10) return;
    const goPage = Math.floor((page - 1) / 10) * 10;
    setPage(goPage);
  }

  const nextPage = () => {
    const goPage = Math.floor((page - 1 ) / 10) *10 + 11;
    setPage(goPage);
  }

  return (
    <div>
      <div className="flex flex-col justify-center text-start py-16 px-50 w-400">
        <span className="text-2xl font-bold"> 의약품 목록 </span>
        <span className="text-gray-400 text-sm mt-3"> 궁금하신 의약품을 검색해보세요 </span>
        <div className="mt-2">
            <select value={reqParam} onChange={(e) => setReqParam(e.target.value)} className="border-3 border-blue-400 p-1 mr-0.5 outline-none">
              <option value="efcyQesitm"> 선택하세요 </option>
              <option value="itemName"> 약품명 </option>
              <option value="entpName"> 회사명 </option>
            </select>
          <input value={keyWord} onChange={(e) => setKeyWord(e.target.value)} type="text" className="border-3 border-blue-400 w-160 h-9 outline-none" />
          <button
            className="bg-blue-400 w-30 h-9 px-2 py-1 text-white"
            onClick={searchBtnClick}
          > 검색 </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 px-28">
        {itemArray.map((data) => (
          <div key={data.itemName} className="shadow rounded-xl">
            <div className="rounded-t-xl overflow-hidden h-2/3">
              <img className="h-full" src={data.itemImage ? data.itemImage : noImg} alt="" />
            </div>
            <div className="border-t border-t-black h-20 py-5">
              <p className="text-xl"> {data.entpName} </p>
              <p className="mt-3"> {data.itemName.length > 14 ? data.itemName.substring(0, 14) : data.itemName} </p>
            </div>
          </div>
        ))}
      </div>
      <ul className="flex gap-1 justify-center my-8 select-none">
        <li onClick={firstPage} className="siz-9 bg-gray-100 flex justify-center items-center border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#777777" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>
        </li>
        <li onClick={prevPage} className="siz-9 bg-gray-100 flex justify-center items-center border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#777777" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </li>
        {numArray.map((num) => (
            <li key={num} onClick={() => setPage(num)} className={`size-9 flex justify-center items-center ${page == num ? "bg-slate-700 text-white" : "border border-gray-300"}  cursor-pointer`}> {num} </li>
        ))}
        <li onClick={nextPage} className="siz-9 bg-gray-100 flex justify-center items-center border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </li>
        <li onClick={lastPage} className="siz-9 bg-gray-100 flex justify-center items-center border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#777777" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
        </li>
      </ul>
    </div>
  );
}

export default MedicalList;
