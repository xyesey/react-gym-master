import bgImage from "../../../images/bg-pic.jpg";
import styles from "./SingleExercises.module.scss";
import stylesLayout from "../../common/Layout.module.scss";
import checkImage from "../../../images/exercises/check.svg";
import checkCompletedImage from "../../../images/exercises/check-completed.svg";

import { useMutation, useQuery } from "react-query";
import cn from "classnames";
import debounce from "lodash.debounce";
import Header from "../../common/Header/Header";
import { $api } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../UI/Alert/Alert";
import { useEffect } from "react";
import Loader from "../../UI/Loader";

function SingleExercise() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isSuccess, refetch, isLoading } = useQuery(
    ["get exercises"],
    () =>
      $api({
        url: `/exercises/log/${id}`,
      })
  );

  const { mutate: changeState, error: errorChange } = useMutation(
    ["Change log state"],
    ({ timeIndex, key, value }) =>
      $api({
        url: "/exercises/log",
        type: "PUT",
        body: { timeIndex, key, value, logId: id },
      }),
    {
      onSuccess(data) {
        refetch();
      },
    }
  );

  const { mutate: setExCompleted, error: errorCompleted } = useMutation(
    ["change log state"],
    () =>
      $api({
        url: "exercises/log/completed",
        type: "PUT",
        body: { logId: id, completed: true },
      }),
    {
      onSuccess() {
        navigate(`/workout/${data.workoutLog}`);
      },
    }
  );

  useEffect(() => {
    if (
      isSuccess &&
      data.times.length ===
        data.times.filter((time) => time.completed).length &&
      data._id === id
    ) {
      setExCompleted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.times, isSuccess]);

  return (
    <>
      <div
        className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
        style={{ backgroundImage: `url(${bgImage})`, height: 356 }}
      >
        <Header onClick />

        {isSuccess && (
          <div className={styles.heading}>
            <img
              src={`/uploads/exercises/${data.exercise.imageName}.svg`}
              height="34"
              alt=""
              draggable={false}
            />
            <h1 className={stylesLayout.heading}>{data.exercise.name}</h1>
          </div>
        )}
      </div>
      <div
        className="wrapper-inner-page"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <div style={{ width: "90%", margin: "0 auto" }}>
          {errorChange && <Alert type="error" text={errorChange} />}
          {errorCompleted && <Alert type="error" text={errorCompleted} />}
        </div>
        {isLoading || (isSuccess && data._id !== id) ? (
          <Loader />
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div>
                <span>Previous</span>
              </div>
              <div>
                <span>Repeat & Weight</span>
              </div>
              <div>
                <span>Completed</span>
              </div>
            </div>
            {data.times.map((item, idx) => {
              return (
                <div
                  className={cn(styles.row, {
                    [styles.completed]: item.completed,
                  })}
                  key={`time ${idx}`}
                >
                  <div
                    className={styles.opacity}
                    key={`Prev ${idx}/${item.prevWeight}`}
                  >
                    <input
                      type="number"
                      defaultValue={item.prevWeight}
                      disabled
                    />
                    <i>kg{item.completed ? "" : " "}</i>
                    <input
                      type="number"
                      defaultValue={item.prevRepeat}
                      disabled
                    />
                  </div>

                  <div key={`RepeatWeight ${idx}/${item.weight}`}>
                    <input
                      type="tel"
                      pattern="[0-9]*"
                      defaultValue={item.weight}
                      onChange={debounce(
                        (e) =>
                          e.target.value &&
                          changeState({
                            timeIndex: idx,
                            key: "weight",
                            value: e.target.value,
                          }),
                        2000
                      )}
                      disabled={item.completed}
                    />
                    <i>kg{item.completed ? "" : " "}/</i>
                    <input
                      type="number"
                      defaultValue={item.repeat}
                      onChange={debounce(
                        (e) =>
                          e.target.value &&
                          changeState({
                            timeIndex: idx,
                            key: "repeat",
                            value: e.target.value,
                          }),
                        800
                      )}
                      disabled={item.completed}
                    />
                  </div>

                  <div key={`Completed ${idx}/${item.completed}`}>
                    <img
                      src={item.completed ? checkCompletedImage : checkImage}
                      className={styles.checkbox}
                      alt=""
                      onClick={() => {
                        changeState({
                          timeIndex: idx,
                          key: "completed",
                          value: !item.completed,
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isSuccess && data?.length === 0 && (
          <Alert type="warning" text="Times not found" />
        )}
      </div>
    </>
  );
}

export default SingleExercise;
