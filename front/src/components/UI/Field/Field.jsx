import styles from "./Field.module.scss";

function Field({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  );
}

export default Field;
