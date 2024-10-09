import { useContext, useEffect } from "react"
import { DefaultButton, MainContainer } from "../../global"
import { Link } from "react-router-dom"
import { User } from "../../components/User"
import { ButtonContainer, DashboardHeaderContainer, HeaderUserDataContainer, UserDataContainer } from "./styles"
import { PlusCircle, SignOut } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"
import { NewDocumentModal } from "../../components/NewDocumentModal"
import { UserContext } from "../../context/UserContext"
import { AuthContext } from "../../context/AuthContext"


export const Dashboard = () => {
    const { userData, isLoading, load, open, setOpen, deleteUser } = useContext(UserContext);
    const {SignOutUser} = useContext(AuthContext)

    useEffect(() => {
        try {
            load();
        } catch (error) {
            console.log(error.response)
        }
    }, [])
    return(
        <MainContainer>
             <DashboardHeaderContainer>
                <h2>Bem vindo, {userData.name}</h2>
                <Link onClick={() => SignOutUser()} to={"/"}>
                    <SignOut size={32}/>
                    <p>Sair</p>
                </Link>
            </DashboardHeaderContainer>
            
            <UserDataContainer>
                <HeaderUserDataContainer>
                    <h3>Seus dados</h3>
                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Dialog.Trigger asChild>
                            <button>
                                <PlusCircle size={16} />
                                <span>Documento</span>
                            </button>
                        </Dialog.Trigger>
                        <NewDocumentModal />
                    </Dialog.Root>
                
                </HeaderUserDataContainer>
                {userData && isLoading ? (
                    <h2>Carregando</h2>
                ):(
                    <User user={userData}/>
                )}
                <ButtonContainer>
                    <DefaultButton >
                        <Link to={`/user/update`}>
                            Alterar dados
                        </Link>
                    </DefaultButton>
                    <DefaultButton className="delete" onClick={() => deleteUser()}>Excluir conta</DefaultButton>
                </ButtonContainer>
            </UserDataContainer>
        </MainContainer>
    )
}