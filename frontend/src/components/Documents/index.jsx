/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DocumentContainer, ItemDocumentContainer, ActionsDocumentContainer } from "./styles";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import {XCircle} from "phosphor-react"


export const Documents = ({document}) => {
    const{ authenticated } = useContext(AuthContext);
    const {deleteDocument, updateDocument} = useContext(UserContext);
    const [updateMode, setUpdateMode] = useState(false)
    const { register, handleSubmit } = useForm();


    const onsubmit = async (data) => {
        if(updateMode){
            updateDocument(data, document.id);
            console.log("trabalhar aqui.");
            setUpdateMode(false)
        }else{
            setUpdateMode(true)
        }
    }

    return(
        <DocumentContainer>
            <ItemDocumentContainer className={updateMode ? "input" : "data"}>
                <tr>
                    <th>Nome</th>
                    {
                        updateMode ? (
                            <td>
                                <input type="text" placeholder="Nome" {...register("name")} defaultValue={document.name}/>
                            </td>
                        ):(
                            <td className="data">
                                <span>{document.name}</span>
                            </td>
                        )
                    }
                </tr>
            </ItemDocumentContainer>
            <ItemDocumentContainer className={updateMode ? "input" : "data"}>
                <tr>
                    <th>Status</th>
                    {
                        updateMode ? (
                            <td>
                                <input type="text" placeholder="Nome" {...register("status")} defaultValue={document.status}/>
                            </td>
                        ):(
                            <td className="data">
                                <span>{document.status}</span>
                            </td>
                        )
                    }
                </tr>
            </ItemDocumentContainer>           
            <ActionsDocumentContainer className={authenticated ? "active" : "inactive"}>
                <button onClick={() => handleSubmit(onsubmit)()}>
                    <span>Atualizar</span>
                </button>
                <button className={updateMode ? "updateActive" : "updateInactive"} onClick={() => setUpdateMode(false)}>
                    <XCircle size={24}/>
                </button>
                <button className="delete" onClick={() => deleteDocument(document.id)}>
                    <span>Excluir</span>
                </button>
            </ActionsDocumentContainer>
        </DocumentContainer>
    );
}