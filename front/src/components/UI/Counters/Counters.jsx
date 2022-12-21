import styles from "./Counters.module.scss";

function Counters({ minutes, workouts, kgs }) {
  return (
    <div className={styles.wrapper}>
        <div className={styles.count}>
          <div className={styles.heading}>Minutes</div>
          <div className={styles.number}>{minutes}</div>
        </div>
        <div className={styles.count}>
          <div className={styles.heading}>Workouts</div>
          <div className={styles.number}>{workouts}</div>
        </div>
        <div className={styles.count}>
          <div className={styles.heading}>KGS</div>
          <div className={styles.number}>{kgs}</div>
        </div>
    </div>
  );
}

export default Counters;
