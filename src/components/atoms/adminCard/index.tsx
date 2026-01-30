import styles from "@/styles/Home.module.css";
import { Check, Pen, TrashIcon, X } from "lucide-react";
import { useState } from "react";
import Input from "@/components/atoms/input";

export default function AdminCard({
  project,
  setTitle,
  setShortDescription,
  setDescription,
  setImage,

  deleteOnclick,
  saveEdits,
}: {
  project: any;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setShortDescription: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  deleteOnclick: () => void;
  saveEdits?: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitleLocal] = useState(project.title);
  const [shortDescription, setShortDescriptionLocal] = useState(
    project.shortDescription,
  );
  const [description, setDescriptionLocal] = useState(project.description);
  const [image, setImageLocal] = useState(project.image);

  return (
    <div className={styles.adminCard}>
      <div className={styles.cardInfo}>
        <img
          className={styles.cardImage}
          src={project.image}
          alt={project.title}
          width="300"
        />
        <div className={styles.cardContent}>
          {editing ? (
            <Input
              type="text"
              value={title}
              onChange={(e) => {
                setTitleLocal(e.target.value);
                setTitle(e.target.value);
              }}
            />
          ) : (
            <h2>{title}</h2>
          )}
          {editing ? (
            <Input
              type="text"
              value={shortDescription}
              onChange={(e) => {
                setShortDescriptionLocal(e.target.value);
                setShortDescription(e.target.value);
              }}
            />
          ) : (
            <p>{shortDescription}</p>
          )}
          {editing ? (
            <Input
              type="textarea"
              value={description}
              onChange={(e) => {
                setDescriptionLocal(e.target.value);
                setDescription(e.target.value);
              }}
            />
          ) : (
            <p>{description}</p>
          )}
          {editing && (
            <Input
              type="text"
              value={image}
              onChange={(e) => {
                setImageLocal(e.target.value);
                setImage(e.target.value);
              }}
            />
          )}
        </div>
      </div>

      <div className={styles.cardButtons}>
        {editing && (
          <button
            className={styles.cardButton}
            onClick={() => {
              if (saveEdits) {
                saveEdits();
              }
              setEditing(false);
            }}
          >
            <Check width={16} height={16} />
          </button>
        )}
        <button
          className={styles.cardButton}
          onClick={() => {
            if (!editing) {
              // Entering edit mode - sync parent state with current values
              setTitle(title);
              setShortDescription(shortDescription);
              setDescription(description);
              setImage(image);
            }
            setEditing(!editing);
          }}
        >
          {editing ? (
            <X width={16} height={16} />
          ) : (
            <Pen width={16} height={16} />
          )}
        </button>
        <button className={styles.cardButton} onClick={deleteOnclick}>
          <TrashIcon width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
