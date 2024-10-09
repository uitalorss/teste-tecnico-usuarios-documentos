/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [userData, setUserData] = useState({});
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const {token, setToken, setAuthenticated} = useContext(AuthContext);

    const baseURL = "http://localhost:3000"
    const axiosConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    async function load() {
        try {
            setIsLoading(true)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const user = await axios.get(`${baseURL}/user`);
            console.log(user.data)
            setUserData(user.data);
            setIsLoading(false);
        } catch (error) {
            setAuthenticated(false)
            console.log(error.response)
        }
    }

    async function loadAdminData() {
        setAuthenticated(false)
        setIsLoading(true)
        const users = await axios.get(`${baseURL}/admin`)
        setAllUsers(users.data);
        setIsLoading(false)
    }

    async function createUser(data, navigate){
        try{
            await axios.post("http://localhost:3000/user",
            data,
            axiosConfig
            );
            setErrorMessage("");
            alert("Usuário cadastrado com sucesso.");
            navigate("/")
        }catch(error){
            console.log(error)
            if(error.response.data.message === "Validation failed"){
                console.log(error.response.data.errors[0].message)
                setErrorMessage(error.response.data.errors[0].message)
            }else{
                console.log(error.response.data.message)
                setErrorMessage(error.response.data.message)
            }
        }
    }

    async function updateUser(data){
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.put(`${baseURL}/user`, data, axiosConfig);
            setErrorMessage("");
            alert("Usuário atualizado com sucesso.");
        } catch (error) {
            if(error.response.data.message === "Validation failed"){
                console.log(error.response.data.errors[0].message)
                setErrorMessage(error.response.data.errors[0].message)
            }else{
                console.log(error.response.data.message)
                setErrorMessage(error.response.data.message)
            }
        }
    }

    async function deleteUser() {
        try {
            alert("Tem certeza que deseja excluir conta?")
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.delete(`${baseURL}/user`)
            alert("Usuário excluído com sucesso.");
            setToken("");
            setAuthenticated(false)
        } catch (error) {
            alert(error.message)
        }
    }

    async function createContact(data) {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.post(`${baseURL}/document`,
            data,
            axiosConfig,
            );
            setErrorMessage("");
            alert("Contato adicionado com sucesso.");
            setOpen(false);
            load();
        } catch (error) {
            if(error.response.data.message === "Validation failed"){
                console.log(error.response.data.errors[0].message)
                setErrorMessage(error.response.data.errors[0].message)
            }else{
                console.log(error.response.data.message)
                setErrorMessage(error.response.data.message)
            }
        }
    }

    async function updateDocument(data, documentId) {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.put(`${baseURL}/document/${documentId}`,data,axiosConfig);
            alert("Documento atualizado com sucesso.");
            load();
        } catch (error) {
            if(error.response.data.message === "Validation failed"){
                alert(error.response.data.errors[0].message)
                setErrorMessage(error.response.data.errors[0].message)
            }else{
                alert(error.response.data.message)
                setErrorMessage(error.response.data.message)
            }
        }
    }

    async function deleteDocument(documentId){
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.delete(`http://localhost:3000/document/${documentId}`)
            load();
        } catch (error) {
            alert(error.message)
        }
    }

    return(
        <UserContext.Provider value={{
            userData,
            isLoading,
            deleteDocument,
            load,
            createContact,
            errorMessage,
            open,
            setOpen,
            deleteUser,
            createUser,
            updateUser,
            openUpdateModal,
            setOpenUpdateModal,
            updateDocument,
            loadAdminData,
            allUsers,
            }}>
            {children}
        </UserContext.Provider>
    )
}