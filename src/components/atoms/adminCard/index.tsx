import styles from "@/styles/Home.module.css";
import { Check, Pen, TrashIcon, X } from "lucide-react";
import { useState } from "react";
import Input from "@/components/atoms/input";
import Checkbox from "@/components/atoms/checkbox";

export default function AdminCard({
  project,
  setTitle,
  setShortDescription,
  setDescription,
  setImage,
  setFitImage,

  deleteOnclick,
  saveEdits,
}: {
  project: any;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setShortDescription: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setFitImage: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [fitImage, setFitImageLocal] = useState(project.containImage);

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
            //TODO make sure linebreaks are also handled in the value
            //TOTO Also make the intputs responsive if the textarea gets too long
            <Input
              type="textarea"
              value={description}
              onChange={(e) => {
                setDescriptionLocal(e.target.value);
                setDescription(e.target.value);
              }}
            />
          ) : (
            <p>
              {description.split("##").map((line: string, index: number) => (
                <span key={index}>
                  {line}
                  {index < description.split("##").length - 1 && <br />}
                </span>
              ))}
            </p>
          )}
          {editing && (
            <div className={styles.imageAdmin}>
              <Input
                type="text"
                value={image}
                onChange={(e) => {
                  setImageLocal(e.target.value);
                  setImage(e.target.value);
                }}
              />

              <Checkbox
                checked={fitImage}
                onChange={(e) => {
                  setFitImageLocal(e.target.checked);
                  setFitImage(e.target.checked);
                }}
                label="Fit image"
              />
            </div>
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
              setTitle(title);
              setShortDescription(shortDescription);
              setDescription(description);
              setImage(image);
              setFitImage(fitImage);
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
