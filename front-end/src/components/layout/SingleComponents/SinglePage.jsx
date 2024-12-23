import { useNavigate } from "react-router-dom"

export const SinglePage = ({svg,text,link}) => {
    const navigate = useNavigate();
    const location = window.location.pathname;
    const currentPage = location === link;
    
  return (
    <div className={`${currentPage ? 'bg-blue-700' : null} flex gap-3 items-center px-3 py-2 cursor-pointer hover:bg-blue-700 mx-auto w-[90%] rounded-lg duration-150 ease-in`}
    onClick={() => navigate(link)}>
        {svg}
        <span className="text-lg">{text}</span>
    </div>
  )
}
