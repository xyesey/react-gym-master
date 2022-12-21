import { useState } from "react";
import cn from "classnames";
import bgImage from "../../../images/exercise2.jpg";
import Layout from "../../common/Layout";
import Button from "../../UI/Button/Button";
import Field from "../../UI/Field/Field";
import styles from "./NewExercise.module.scss";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Alert from "../../UI/Alert/Alert";
import Loader from "../../UI/Loader";

const data = ["chest", "shoulders", "biceps", "legs", "hit"];

function NewExercise() {
  const [name, setName] = useState("");
  const [times, setTimes] = useState(0);
  const [imageName, setImageName] = useState("chest");

  const { isSuccess, mutate, isLoading, error } = useMutation(
    "Create new exercise",
    () =>
      $api({
        url: "/exercises",
        type: "POST",
        body: { name, times, imageName },
      }),
    {
      onSuccess() {
        setName("");
        setTimes("");
        setImageName("chest");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && times && imageName) mutate();
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Lets see what you got." />
      <div className="wrapper-inner-page">
        {error && <Alert type="error" text={error} />}
        {isSuccess && <Alert text="This is an exercise, wow" />}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
          <Field
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Field
            placeholder="Enter times"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
          />
          <div className={styles.images}>
            {data.map((name) => (
              <img
                key={`ex ${name}`}
                src={`/uploads/exercises/${name}.svg`}
                alt={name}
                className={cn({
                  [styles.active]: imageName === name,
                })}
                onClick={() => setImageName(name)}
              />
            ))}
          </div>

          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  );
}

export default NewExercise;
