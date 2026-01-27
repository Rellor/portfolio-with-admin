import styles from "@/styles/Home.module.css";

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return type === "textarea" ? (
    <textarea
      className={styles.input}
      value={value}
      onChange={(e) =>
        onChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
      }
      placeholder={placeholder}
    />
  ) : (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
