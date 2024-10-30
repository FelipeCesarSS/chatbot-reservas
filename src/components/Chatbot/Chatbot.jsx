import React, { Component, useState } from "react";
import ChatBot from 'react-simple-chatbot';
import {ThemeProvider} from 'styled-components';
import Post from './Post';
// import Link from './Link';
import Map from './map'


const theme = {
    background: '#f5f8fa',
    fontFamily: 'Arial, sans-serif',
    headerBgColor: '#333',
    headerFontColor: '#fff',
    headerFontSize: '16px',
    botBubbleColor: '#333',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

const config = {
    width: '300px',
    height: '400px',
    hideUserAvatar: true,
    placeholder: 'Digite uma pergunta',
    headerTitle: 'ChatBot',
};

const ChatBot = () => {
    const [showChat, setshowChat] = useState(false);

    const startChat = () => {
        setshowChat(true);
    };

    const hideChat = () => {
        setshowChat(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{display: showChat ? 'none' : ''}}>
                <ChatBot
                    speechSynthesis={{enable: true, lang: 'pt-BR'}}
                    recognitionEnabled={true}
                    steps={[
                        {
                            id: 'welcome',
                            message: 'Ola!',
                            trigger: 'q-firstname',
                        },
                        {
                            id: 'q-firstname',
                            message: 'Qual é o seu nome',
                            trigger: 'firstname',
                        },
                        {
                            id: 'firstname',
                            user: true,
                            validador: (value) => {
                                if(/^[A-Za-z]+$/.test(value)){
                                    return true;
                                }else{
                                    return 'Por favor, digite seu nome somente com letras';
                                }
                            },
                            trigger: 'turismocbot',
                        },
                        {
                            id: 'turismocbot',
                            message: 'oi, {previousValue}! Eu sou o turismocbot! Como posso ajudar',
                            trigger: 'qtype',
                        },
                        {
                            id: 'qtype',
                            options: [
                                { value: 'horario', label: 'Quero saber o horário de check-in', trigger: 'horario' },
                                { value: 'cancelamento', label: 'Quero saber como cancelar minha reserva', trigger: 'cancelamento' },
                                { value: 'checkin', label: 'Quero saber o local de check-in', trigger: 'checkin' },
                                { value: 'praias', label: 'Quero saber sobre as praias', trigger: 'praias' },
                                { value:'restaurantes', label: 'Quero saber sobre os restaurantes', trigger:'restaurantes' },
                                { value: 'cultura', label: 'Quero saber sobre a cultura', trigger: 'cultura' },
                                { value:'submit', label: 'Mais informações', trigger:'submit' },
                                {value: 'map', label: 'pontos turisticos', trigger:'map' },
                            ],
                        },
                        {
                            id: 'horario',
                            message: 'Para ver o horário de check-in, você pode verificar na página do hotel ou acessar o site do hotel on-line.',
                            trigger: 'qtype',
                        },
                        {
                            id: 'cancelamento',
                            message: 'Para cancelar sua reserva, você pode acessar o site do hotel on-line e fazer o cancelamento.',
                            trigger: 'qtype',
                        },
                        {
                            id: 'checkin',
                            message: 'O local de check-in do hotel é o Hotel Maceió.',
                            trigger: 'qtype',
                        },
                        {
                            id: 'praias',
                            message: 'As praias de Maceió incluem Pajuçara, Ponta Verde e Jatiúca.',
                            trigger: 'qtype',
                        },
                        {
                            id:'restaurantes',
                            message: 'Os restaurantes do hotel Maceió incluem a Maceió do Café, a Maceió do Bistro, e a Maceió do Restaurante.',
                            trigger: 'qtype',
                        },
                        {
                            id: 'cultura',
                            message: 'A cultura de Maceió é muito divertida e inclui atividades como a Maceió do Sertão, a Maceió do Mar e a Maceió do Bairro.',
                            trigger: 'qtype',
                        },
                        {
                            id: 'map',
                            Component:<Map/>,
                            trigger: 'qtype',
                        },
                        {
                            id: 'q-submit',
                            message: 'Voce tem mais perguntas?',
                            trigger: 'qtype',
                        },
                        {
                            id: 'submit',
                            options: [
                                {value: 'S', label: 'Sim', trigger: 'no-submit'},
                                {value: 'N', label: 'Não', trigger: 'end-message'},
                            ],
                        },
                        {
                            id: 'no-submit',
                            options: [
                                {value: 'qtype', label: 'Sobre o hotel', trigger: 'horario' },
                                {value: 'qtype', label: 'Como cancelar a reserva', trigger: 'cancelamento' },
                                {value: 'qtype', label: 'Onde é o check-in', trigger: 'checkin' },
                                {value: 'qtype', label: 'Sobre as praias', trigger: 'praias' },
                                {value: 'qtype', label: 'Sobre os restaurantes', trigger: 'restaurantes' },
                                {value: 'qtype', label: 'Sobre a cultura', trigger: 'cultura' },
                                {value: 'q-submit', label: 'Outras perguntas?', trigger: 'q-submit'},
                            ],
                        },
                        {
                            id: 'end-message',
                            Component: <Post/>,
                            asMessage: true,
                            end: true,
                        },
                    ]}
                    {...config}
                />
            </div>
            <div>
                {!showChat ?(
                    <button className="btn" onClick={startChat}>
                        <i className="fa fa-minus"></i>
                    </button>
                ):(
                    <button className="btn" onClick={endChat}>
                        <i className="fa fa-plus"></i>
                    </button>
                )}
            </div>
        </ThemeProvider>
    );
};