import ReactSelect from "react-select";
import Layout from "../../common/Layout";
import bgImage from "../../../images/newwork2.jpg";
import Field from "../../UI/Field/Field";
import { useState } from "react";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { $api } from "../../../api/api";
import Alert from "../../UI/Alert/Alert";
import Loader from "../../UI/Loader";

function NewWorkout() {
  const [name, setName] = useState("");
  const [exercisesCurrent, setExercisesCurrent] = useState([]);

  const { data, isSuccess } = useQuery(
    "list exercises",
    () =>
      $api({
        url: "/exercises",
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    mutate,
    isLoading,
    isSuccess: isSuccessMutate,
    error,
  } = useMutation("Create new Workout", ({ exIds }) =>
    $api({
      url: "/workouts",
      type: "POST",
      body: { name, exercisesId: exIds },
    }),
    {
      onSuccess() {
        setName('')
        setExercisesCurrent([])
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const exIds = exercisesCurrent.map((ex) => ex.value);

    mutate({
      exIds,
    });
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Lets see what you got." />
      <div className="wrapper-inner-page">
        {error && <Alert type="error" text={error} />}
        {isSuccessMutate && <Alert text="Workout Created" />}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
          <Field
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Link to="/new-exercise" className="dark-link">
            Add New Exercise
          </Link>
          {isSuccess && data && (
            <ReactSelect
              classNamePrefix="select2-selection"
              placeholder="Exercise..."
              title="Exercise"
              options={[
                { value: "asdasd", label: "Push-ups" },
                { value: "asddss", label: "Pull-ups" },
              ]}
              value={exercisesCurrent}
              onChange={setExercisesCurrent}
              isMulti={true}
            />
          )}

          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  );
}

export default NewWorkout;
