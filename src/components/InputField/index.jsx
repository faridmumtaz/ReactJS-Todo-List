function InputField(props) {
  let inputFieldStyle = "form-control my-3";
  const { id, type, name, value, onChange, placeholder, required, autoFocus , min} = props;
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      className={inputFieldStyle}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoFocus={autoFocus && "autofocus"}
      min={min}
    />
  );
}

export default InputField;
