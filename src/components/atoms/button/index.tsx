import styles from "@/styles/Home.module.css";

export default function AdminCard({
  buttonStyle,
  children,
  onClick,
}: {
  buttonStyle: "buttonDefault" | "buttonGreen" | "buttonBorder";
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return buttonStyle ? (
    <button
      className={`${styles.buttonBase} ${styles[buttonStyle]}`}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <p>No buttonstyle given</p>
  );
}
