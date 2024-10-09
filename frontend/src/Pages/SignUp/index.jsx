import { useForm } from "react-hook-form"
import { DefaultButton, MainContainer, SpanError } from "../../global"
import { ContentContainer, FormContainer, FormGroup, NavContainer, SignUpContainer } from "./styles"
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignIn } from "phosphor-react";
import { UserContext } from "../../context/UserContext";



export const SignUp = () => {
    const {register, handleSubmit} = useForm();
    const {errorMessage, createUser} = useContext(UserContext);
    const navigate = useNavigate();

    const onsubmit = async (data) => {
        console.log(data)
        createUser(data, navigate);
    }

    return(
        <MainContainer>
            <NavContainer>
                <Link to={"/"}>
                    <SignIn size={32}/>
                    <p>Login</p>
                </Link>
            </NavContainer>
            <ContentContainer>
                <SignUpContainer>
                    <h2>Cadastro de usuário</h2>
                    <FormContainer>
                        <FormGroup>
                            <label htmlFor="name">Nome</label>
                            <input type="text" {...register("name")} placeholder="Nome" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="email">Email</label>
                            <input type="text" {...register("email")}
                                placeholder="email@email.com"
                            />
                        </FormGroup>
                    </FormContainer>

                    <DefaultButton onClick={() => handleSubmit(onsubmit)()} type="submit">
                        Cadastrar
                    </DefaultButton>
                    <SpanError className={errorMessage === "" ? "" : "active"}>
                        {errorMessage}
                    </SpanError>
                    
                </SignUpContainer>
            </ContentContainer>
        </MainContainer>
    )
}