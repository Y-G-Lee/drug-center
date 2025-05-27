import logo from "../../assets/medical-logo.png";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <Link to={"/"}>
        <img src={logo} className="h-20 mb-2" alt="Logo" />
      </Link>
      <nav className="flex items-center justify-between">
        <ul className="flex items-center font-notokr bg-blue-400 w-full h-16 justify-end">
          <li className="mx-2 text-white">
            <Link to={"/medical-list"}> 의약품 목록 </Link>
          </li>
          <li className="mx-2 text-white">
            <Link to={"/companyStatistics"}> 제약회사 통계 </Link>
          </li>
          <li className="mx-2 text-white">
            <Link to={"/pharmacy"}> 내 주변 약국 </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
