export const Input = ({type,placeholder,required=true,value,onChange,name,size,readOnly=false,width}) => {
    return (
        <input type={type} 
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={size}
        name={name}
        readOnly={readOnly}
        className={`${width? `w-[${width}]` :'w-[100%]'} rounded-sm px-3 py-1 border-2 bg-inherit border-gray-200 outline-none`} />
    )
}
