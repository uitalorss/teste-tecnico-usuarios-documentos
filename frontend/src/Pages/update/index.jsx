import { useForm } from "react-hook-form"
import { DefaultButton, MainContainer, SpanError } from "../../global"
import { ContentContainer, FormContainer, FormGroup, NavContainer, SignUpContainer } from "./styles"
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SignIn } from "phosphor-react";
import { UserContext } from "../../context/UserContext";



export const Update = () => {
    const {register, handleSubmit} = useForm();
    const {errorMessage, updateUser, userData, load} = useContext(UserContext);
    const { userId } = useParams();

    useEffect(() => {
        load(userId);

    }, [])
    const onsubmit = async (data) => {
        updateUser(data);
    }

    return(
        <MainContainer>
            <NavContainer>
                <Link to={`/user`}>
                    <SignIn size={32}/>
                    <p>Voltar</p>
                </Link>
            </NavContainer>
            <ContentContainer>
                <SignUpContainer>
                    <h2>Atualizar dados</h2>
                    <FormContainer>
                        <FormGroup>
                            <label htmlFor="name">Nome</label>
                            <input type="text" {...register("name")} placeholder="Nome" defaultValue={userData.name} required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="email">Email</label>
                            <input type="text" {...register("email")}
                                placeholder="email@email.com"
                                defaultValue={userData.email}
                            />
                        </FormGroup>
                    </FormContainer>
                    <DefaultButton onClick={() => handleSubmit(onsubmit)()} type="submit">
                        Atualizar
                    </DefaultButton>
                    <SpanError className={errorMessage === "" ? "" : "active"}>
                        {errorMessage}
                    </SpanError>
                </SignUpContainer>
            </ContentContainer>
        </MainContainer>
    )
}