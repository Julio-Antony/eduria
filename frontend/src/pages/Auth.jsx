import React, { useCallback, useState } from "react";
import * as Components from "../components/auth/LoginComponent";
import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setUserlevel, setUserSession } from "../config/Api";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import swal from "sweetalert";

const Auth = () => {
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registName, setRegistName] = useState("");
  const [registEmail, setRegistEmail] = useState("");
  const [registPassword, setRegistPassword] = useState("");
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
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

  const registData = {
    nama: registName,
    email: registEmail,
    password: bcrypt.hashSync(registPassword, 10),
    level: "siswa",
  };

  const data = useCallback(() => {
    const loginUrl = "/api/users/login";

    const login = axios.post(loginUrl, bodyFormData, {
      headers: { "Content-Type": "application/json" },
    });

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
        if (err.response.status === 401) {
          setError("Username / Password salah !");
        }
        setLoading(false);
      });
  }, [bodyFormData, history]);

  const OnSubmit = () => {
    setError(null);
    setLoading(true);
    data();
  };

  const OnRegist = () => {
    setError(null);
    setLoading(true);
    axios
      .post("/api/users", registData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        history.push({ pathname: "/" });
        swal("Berhasil membuat akun, silahkan login", {
          icon: "success",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setError1("User sudah dipakai");
        }
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="col-md-8 offset-3">
        <Components.Container>
          <Components.SignUpContainer signingIn={signIn}>
            <Components.Form onSubmit={handleSubmit(OnRegist)}>
              {error1 && <p className="error text-danger">{error1}</p>}
              <Components.Input
                type="text"
                id="registUsername"
                name="registUsername"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("registUsername")}
                placeholder="Username"
                onChange={(e) => setRegistName(e.target.value)}
                required
              />
              {errors.registUsername && (
                <p className="error text-danger">
                  {errors.registUsername.message}
                </p>
              )}
              <Components.Input
                type="email"
                id="registEmail"
                name="registEmail"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("registEmail")}
                placeholder="Email"
                onChange={(e) => setRegistEmail(e.target.value)}
                required
              />
              {errors.registEmail && (
                <p className="error text-danger">
                  {errors.registEmail.message}
                </p>
              )}
              <Components.Input
                type="password"
                id="registPassword"
                name="registPassword"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("registPassword")}
                placeholder="Password"
                onChange={(e) => setRegistPassword(e.target.value)}
                required
              />
              {errors.registPassword && (
                <p className="error text-danger">
                  {errors.registPassword.message}
                </p>
              )}
              <Components.Button type="submit" disabled={loading}>
                Daftar
              </Components.Button>
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
              {/* <Components.Anchor href="#">lupa password?</Components.Anchor> */}
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
