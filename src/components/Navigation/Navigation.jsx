import logo from "../../assets/medical-logo.png"

function Navigation() {
    return(
        <div>
            <img src={logo} className="h-20 mb-2" alt="Logo" />
        <nav className="flex items-center justify-between">
                <ul className="flex items-center font-notokr bg-blue-400 w-full h-16 justify-end">
                    <li className="mx-2 text-white"> 의약품 목록 </li>
                    <li className="mx-2 text-white"> 제약회사 통계 </li>
                    <li className="mx-2 text-white"> 내 주변 약국 </li>
                </ul>
        </nav>
        </div>
    );
}

export default Navigation;