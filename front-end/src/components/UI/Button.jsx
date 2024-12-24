import { CircularProgress } from "@mui/material"

export const Button = ({text,type,bg,loading,width,onClick,color}) => {
  return (
        <button type={type}
                disabled={loading}
                onClick={onClick}
                className={`${color?`text-{${color}}`:'text-white'} ${width? `w-${width}`:'w-[100%]'} ${bg? `${bg}`:'bg-blue-700'} h-9 font-semibold rounded-sm text-md px-3 py-1 flex items-center justify-center ${loading? 'cursor-no-drop':null}`}>
                    {
                        loading ? 
                            <CircularProgress size={"22px"} color="white"/>
                        : text
                    }
        </button>
    )
}
    