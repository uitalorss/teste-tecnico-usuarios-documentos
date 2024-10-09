/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ItemUserContainer, UserContainer,  } from "./styles";
import { UserContext } from "../../context/UserContext";
import { Documents} from "../Documents"


export const User = ({user}) => {
    const {isLoading} = useContext(UserContext)

    return(
        <UserContainer>
            {user && isLoading ? (
                <h2>Carregando</h2>
            ):(
            <>
                <ItemUserContainer>
                    <tr>
                        <th>Nome completo</th>
                        <td>{user.name}</td>
                    </tr>
                </ItemUserContainer>
                <ItemUserContainer>
                    <tr>
                        <th>Usuário</th>
                        <td>{user.email}</td>
                    </tr>
                </ItemUserContainer>
                
                <ItemUserContainer>
                    <tr>
                        <th>Documentos</th>
                    </tr>
                    <tr className="contact-item">
                        {user.documents.map((document) => {
                        return(
                            <Documents key={document.id} document={document}/>
                        )
                    })}</tr>
                </ItemUserContainer>
            </>
            )}
        </UserContainer>
    );
}