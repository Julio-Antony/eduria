import React, { useCallback, useState } from "react";
import * as Components from "../components/auth/LoginComponent";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setUserlevel, setUserSession } from "../config/Api";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

const Auth = () => {
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const bodyFormData = {
    email: username,
    password: password,
  };

  const data = useCallback(() => {
    const loginUrl = "/api/users/login";
    const registUrl = "/api/users";

    const login = axios.post(loginUrl, bodyFormData, {
      headers: { "Content-Type": "application/json" },
    });
    // const regist = axios.post(registUrl, {
    //   headers: { "Content-Type": "application/json" },
    // });

    axios
      .all([login])
      .then(
        axios.spread((...allData) => {
          console.log(allData[0]);
          setLoading(false);
          setUserSession(allData[0].data.token);
          localStorage.setItem("username", allData[0].data.nama);
          setUserlevel(allData[0].data.level);
          if (allData[0].data.level === "admin") {
            history.push({
              pathname: "/dashboard",
            });
          } else {
            history.push({
              pathname: "/beranda",
            });
          }
        })
      )
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 401) {
        //   setError("Username / Password salah !");
        // }
        setLoading(false);
      });
  }, [bodyFormData, history]);

  const OnSubmit = () => {
    setError(null);
    setLoading(true);
    data();
  };

  return (
    <div>
      <div className="col-md-8 offset-3">
        <Components.Container>
          <Components.SignUpContainer signingIn={signIn}>
            <Components.Form>
              <Components.Input type="text" placeholder="Name" />
              <Components.Input type="email" placeholder="Email" />
              <Components.Input type="password" placeholder="Password" />
              <Components.Button>Daftar</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>
          <Components.SignInContainer signingIn={signIn}>
            <Components.Form onSubmit={handleSubmit(OnSubmit)}>
              {error && <p className="error text-danger">{error}</p>}
              <Components.Input
                type="text"
                id="username"
                name="username"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("username")}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && (
                <p className="error text-danger">{errors.username.message}</p>
              )}
              <Components.Input
                type="password"
                id="password"
                name="password"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("password")}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <p className="error text-danger">{errors.password.message}</p>
              )}
              <Components.Anchor href="#">lupa password?</Components.Anchor>
              <Components.Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Masuk"}
              </Components.Button>
            </Components.Form>
          </Components.SignInContainer>
          <Components.OverlayContainer signingIn={signIn}>
            <Components.Overlay signingIn={signIn}>
              <Components.LeftOverlayPanel signingIn={signIn}>
                <Components.Title>Hallo !</Components.Title>
                <Components.Paragraph>
                  Selamat bergabung bersama kami, silahkan isi data diri kamu
                  untuk akses aplikasi ini.
                </Components.Paragraph>
                <Components.Subparagraph>
                  sudah punya akun ?
                </Components.Subparagraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Masuk
                </Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signingIn={signIn}>
                <Components.Title>Selamat Datang!</Components.Title>
                <Components.Paragraph>
                  Silahkan login terlebih dahulu untuk mengakses kegiatan
                  belajar kamu
                </Components.Paragraph>
                <Components.Subparagraph>
                  belum punya akun ?
                </Components.Subparagraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Daftar
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
    </div>
  );
};

export default Auth;
