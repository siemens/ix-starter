const FormField = ({ id, label, register }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        {...register(id)}
      />
    </div>
  );
};

export default FormField;