import React from 'react'
import * as Components from "../components/auth/LoginComponent";

const Auth = () => {
    const [signIn, toggle] = React.useState(true);
    return (
        <div>
            <div className='col-md-8 offset-3'>
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
                        <Components.Form>
                            <Components.Input type="text" placeholder="Username" />
                            <Components.Input type="password" placeholder="Password" />
                            <Components.Anchor href="#">lupa password?</Components.Anchor>
                            <Components.Button>Masuk</Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>
                    <Components.OverlayContainer signingIn={signIn}>
                        <Components.Overlay signingIn={signIn}>
                            <Components.LeftOverlayPanel signingIn={signIn}>
                                <Components.Title>Hallo !</Components.Title>
                                <Components.Paragraph>
                                    Selamat bergabung bersama kami, silahkan isi data diri kamu untuk akses aplikasi ini.
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
                                    Silahkan login terlebih dahulu untuk mengakses kegiatan belajar kamu
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
    )
}

export default Auth
