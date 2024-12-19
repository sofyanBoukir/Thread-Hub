import { useState } from "react"

export const Notification = ({text,kind}) => {
    const [open,setOpen] = useState(true);
    setTimeout(() =>{
        setOpen(false);
    },3000)
  return (
    <div>
        {
            kind === 'success' && open?
                <div className="border-2 border-green-700 text-green-600 bg-white animate-notificationAnimation rounded-3xl px-3 py-1 absolute top-5 left-1/2 transform -translate-x-1/2 ">
                    <span className="font-semibold">✔ {text}</span>
                </div> : null
        }
        {   
            kind === 'error' && open ?
            <div className="border-2 border-red-700 text-red-600 bg-white animate-notificationAnimation rounded-3xl px-3 py-1 absolute top-5 left-1/2 transform -translate-x-1/2 ">
                <span className="font-semibold">❌ {text}</span>
            </div>  : null 
        }
    </div>
  )
}
