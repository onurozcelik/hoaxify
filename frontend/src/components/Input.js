import React from "react";

const Input = (props) => {
    // Object destruction
    const { label, name, error, onChange, type } = props;
    const className = error ? "form-control is-invalid" : "form-control";
    return (
        <div className="mb-2">
        <div className="form-group">
            <label>{label}</label>
            <input className={className} name={name} onChange={onChange} type={type} />
            <div className="invalid-feedback">{error}</div>
        </div>
        </div>
    );
}

export default Input;