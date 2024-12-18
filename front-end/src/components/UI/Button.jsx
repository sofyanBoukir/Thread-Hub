import { CircularProgress } from "@mui/material"

export const Button = ({text,type,bg,loading,width,onClick}) => {
  return (
        <button type={type}
                disabled={loading}
                onClick={onClick}
                className={`${width? `w-${width}`:'w-[100%]'} ${bg? `${bg}`:'bg-blue-700'} h-9 font-semibold text-white rounded-sm text-md px-3 py-1 flex items-center justify-center ${loading? 'cursor-no-drop':null}`}>
                    {
                        loading ? 
                            <CircularProgress size={"22px"} color="white"/>
                        : text
                    }
        </button>
    )
}
    