import styles from "@/styles/Home.module.css";

export default function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}) {
  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label && <label className={styles.checkboxLabel}>{label}</label>}
    </div>
  );
}
