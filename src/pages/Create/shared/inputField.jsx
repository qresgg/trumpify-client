import React from "react";
import "../../../style/addictions/inputs.module.scss"

export default function InputField({
	label,
	required = null,
	pattern = null,
	register = "",
	name,
	type = "text",
	errors,
	component = null,
	className = null
}){
	return (
		<div className={className ? className : "w-full flex flex-col gap-2 font-bold text-xs"}>
			<label className="f-bold">
				<p>{label}</p>
				{required && <p className={'error'} title="required">*</p>}
			</label>
			{component ? (
				component
			) : type === "textarea" ? (
				<textarea
					{...register(name, {
						required,
						...(pattern && { pattern })
					})}
					name={name}
					className="tarea"
				/>
			) : (
				<input
					{...register(name, {
						required,
						...(pattern && { pattern })
					})}
					type={type}
					name={name}
					className="p-2 h-8"
				/>
			)}
			{errors[name] && <p className={'error'}>{errors[name].message}</p>}
		</div>
	)
}
