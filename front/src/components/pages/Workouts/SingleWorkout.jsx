import bgImage from "../../../images/bgpic2.jpg";
import styles from "./SingleWorkout.module.scss";
import stylesLayout from "../../common/Layout.module.scss";

import { useMutation, useQuery } from "react-query";
import cn from "classnames";
import Header from "../../common/Header/Header";
import { $api } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../UI/Alert/Alert";
import { Fragment, useEffect } from "react";
import Loader from "../../UI/Loader";

function SingleWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isSuccess, isLoading } = useQuery(["get workout"], () =>
    $api({
      url: `/workouts/log/${id}`,
    })
  );

  const { mutate: setWorkoutCompleted, error: errorCompleted } = useMutation(
    ["Change log state"],
    () =>
      $api({
        url: "/workouts/log/completed",
        type: "PUT",
        body: { logId: id },
      }),
    {
      onSuccess(data) {
        navigate(`/workouts`);
      },
    }
  );

  useEffect(() => {
    if (
      isSuccess &&
      data?.exerciseLogs &&
      data.exerciseLogs.length ===
        data.exerciseLogs.filter((log) => log.completed).length &&
      data._id === id
    ) {
      setWorkoutCompleted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.exerciseLogs]);

  return (
    <>
      <div
        className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
        style={{ backgroundImage: `url(${bgImage})`, height: 356 }}
      >
        <Header backLink="/workouts" />

        {isSuccess && (
          <div>
            <time className={styles.time}>{data.minutes + " min."}</time>
            <h1 className={stylesLayout.heading}>{data.workout.name}</h1>
          </div>
        )}
      </div>
      <div
        className="wrapper-inner-page"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <div style={{ width: "90%", margin: "0 auto" }}>
          {errorCompleted && <Alert type="error" text={errorCompleted} />}
        </div>
        {isLoading || (isSuccess && data._id !== id) ? (
          <Loader />
        ) : (
          <div className={styles.wrapper}>
            {data.exerciseLogs.map((exLog, idx) => {
              return (
                <Fragment key={`ex log ${idx}`}>
                  <div
                    className={cn(styles.item, {
                      [styles.completed]: exLog.completed,
                    })}
                  >
                    <button
                      aria-label="Move to exercise"
                      onClick={() => navigate(`/exercise/${exLog._id}`)}
                    >
                      <span>{exLog.exercise.name}</span>
                      <img
                        src={`/uploads/exercises/${exLog.exercise.imageName}.svg`}
                        height="34"
                        alt=""
                        draggable={false}
                      />
                    </button>
                  </div>
                  {idx % 2 !== 0 && idx !== data.exerciseLogs.length - 1 && (
                    <div className={styles.line}></div>
                  )}
                </Fragment>
              );
            })}
          </div>
        )}

        {isSuccess && data?.length === 0 && (
          <Alert type="warning" text="Exercises not found" />
        )}
      </div>
    </>
  );
}

export default SingleWorkout;
