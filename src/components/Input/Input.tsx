import "./Input.scss";

interface Props { 
    label: string,
    name: string,
    type: string
}

const Input: React.FC<Props> = ({ label, name, type }) =>{
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <input type={type} id={name} name={name} className="field__input" />
        </div>
    );
}

export default Input;
