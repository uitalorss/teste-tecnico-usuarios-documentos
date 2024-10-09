/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog"
import { Content, Overlay } from "./styles"
import { useForm } from "react-hook-form";
import { DefaultButton, SpanError } from "../../global";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


export const NewDocumentModal = () => {
    const { register, handleSubmit } = useForm();
    const {createDocument, errorMessage} = useContext(UserContext) 
    const navigate = useNavigate()
    
    const onsubmit = async (data) => {
        createDocument(data, navigate)
    }
    return(
        <Dialog.Portal>
            <Overlay />
            <Content>
                <div>
                    <h2>Novo Documento</h2>
                    <input type="text" placeholder="Nome" {...register("name")} />
                    <select name="status" {...register("status")}>
                        <option value="" disabled>Selecione a opção</option>
                        <option value="Não assinado">Não assinado</option>
                        <option value="Parcialmente assinado">Parcialmente assinado</option>
                        <option value="Assinado">Assinado</option>
                    </select> 
                    <DefaultButton onClick={() => handleSubmit(onsubmit)()}>
                        Adicionar
                    </DefaultButton>
                    <SpanError className={errorMessage === "" ? "" : "active"}>
                        {errorMessage}
                    </SpanError>
                </div> 
            </Content>
        </Dialog.Portal>
    )
}