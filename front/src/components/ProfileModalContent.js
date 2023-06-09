import { Button, TextField } from "@mui/material";
import NewPasswordModal from "./NewPasswordModal";
import { useEffect, useState } from "react";

const ProfileModalContent = (props) => {
    // пользователь
    const user = props.user
    const onSave = props.onSave

    // проверка валидности email
    const [isEmailValid, setIsEmailValid] = useState(true);

    // проверка валидности email
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // состояние полей
    const [name, setName] = useState(user.name);
    const [login, setLogin] = useState(user.login);
    const [email, setEmail] = useState(user.email);

    // useEffect для изменения полей пользователя
    useEffect(() => {
        user.name = name;
        user.login = login;
        user.email = email;
    }, [name, login, email])

    // useEffect для проверки валидности email
    useEffect(() => {
        setIsEmailValid(isValidEmail(email))
    }, [email])

    // элемент профиля
    return (
        <>
            <TextField
                label='Имя' variant='outlined'
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                style={{ width: '100%', marginBottom: '10px' }} />
            <TextField
                label='Логин' variant='outlined'
                value={login}
                onChange={(e) => { setLogin(e.target.value) }}
                style={{ width: '100%', marginBottom: '10px' }} />
            <TextField
                error={!isEmailValid}
                label='E-mail' variant='outlined'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                style={{ width: '100%', marginBottom: '10px' }} />
                {isEmailValid ? null : <h4 style={{color: 'red'}}>Некорректный email</h4>}
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '350px', margin: '0 auto', marginTop: '20px' }}>
                <NewPasswordModal />
                <Button variant='contained' onClick={() => { if(isEmailValid) onSave(user) }}>Сохранить</Button>
            </div>
        </>
    );
}

export default ProfileModalContent;