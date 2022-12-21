import Layout from "../../common/Layout";
import bgImage from "../../../images/reg.jpg";
import Field from "../../UI/Field/Field";
import { useState } from "react";
import Button from "../../UI/Button/Button";
import styles from "./Auth.module.scss";
import Alert from "../../UI/Alert/Alert";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Loader from "../../UI/Loader";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("auth"); // Auth or Reg

  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  const successLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuth(true);

    setEmail("");
    setPassword("");

    navigate("/");
  };

  const {
    mutate: register,
    isLoading,
    error,
  } = useMutation(
    "Registration",
    () =>
      $api({
        url: "/users",
        type: "POST",
        body: { email, password },
        auth: false,
      }),
    {
      onSuccess(data) {
        successLogin(data.token)
      },
    }
  );

  const {
    mutate: auth,
    isLoadingAuth,
    errorAuth,
  } = useMutation(
    "Auth",
    () =>
      $api({
        url: "/users/login",
        type: "POST",
        body: { email, password },
        auth: false,
      }),
    {
      onSuccess(data) {
        successLogin(data.token)
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "auth") {
      auth();
    } else {
      register();
    }
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Enter the abode of the GYM MASTER" />
      <div className="wrapper-inner-page">
        {error && <Alert type="error" text={error} />}
        {errorAuth && <Alert type="error" text={errorAuth} />}
        {isLoading || isLoadingAuth && <Loader />}
        <form onSubmit={handleSubmit}>
          <Field
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Field
            placeholder="Enter Password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            required
            type="password"
          />
          <div className={styles.wrapperButtons}>
            <Button text="Sing In" callback={() => setType("auth")} />
            <Button text="Sing Up" callback={() => setType("reg")} />
          </div>
        </form>
      </div>
    </>
  );
}

export default Auth;
