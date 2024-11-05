import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Post from './Post';
import Map from './map';
import '../../App.css';

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#0f4d4a',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#0f4d4a',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

const config = {
    width: '300px',
    height: '400px',
    hideUserAvatar: true,
    placeholder: 'Digite sua resposta...',
    headerTitle: 'Turismo Alagoas',
};

const Chatbot = () => {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat((prev) => !prev);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                {showChat && (
                    <ChatBot
                        speechSynthesis={{ enable: true, lang: 'pt-BR' }}
                        recognitionEnable={true}
                        steps={[
                            {
                                id: 'boas-vindas',
                                message: 'Olá! Bem-vindo ao guia de turismo em Alagoas.',
                                trigger: 'pergunta-nome',
                            },
                            {
                                id: 'pergunta-nome',
                                message: 'Qual é o seu nome?',
                                trigger: 'nome',
                            },
                            {
                                id: 'nome',
                                user: true,
                                validator: (value) => /^[A-Za-zÀ-ú\s]+$/.test(value) ? true : 'Por favor, insira apenas caracteres alfabéticos.',
                                trigger: 'saudacao',
                            },
                            {
                                id: 'saudacao',
                                message: 'Oi, {previousValue}! Como posso ajudar você com informações sobre Alagoas?',
                                trigger: 'tipo-pergunta',
                            },
                            {
                                id: 'tipo-pergunta',
                                options: [
                                    { value: 1, label: 'Pontos Turísticos', trigger: 'pontos-turisticos' },
                                    { value: 2, label: 'Praias', trigger: 'praias' },
                                    { value: 3, label: 'Gastronomia', trigger: 'gastronomia' },
                                    { value: 4, label: 'Atividades', trigger: 'atividades' },
                                ],
                            },
                            {
                                id: 'pontos-turisticos',
                                message: 'Aqui estão os pontos turísticos de Alagoas. Você gostaria de ver o mapa?',
                                trigger: 'mapa-button',
                            },
                            {
                                id: 'mapa-button',
                                component: (
                                    <div>
                                        <Map />
                                        <button onClick={toggleChat}> Mostrar mapa</button>
                                    </div>
                                ),
                            },
                            {
                                id: 'praias',
                                message: 'Alagoas tem praias lindas! Algumas recomendadas são Praia do Francês, Praia do Gunga e Pajuçara.',
                                trigger: 'pergunta-final',
                            },
                            {
                                id: 'gastronomia',
                                message: 'Não perca os pratos típicos como sururu, peixada alagoana e bolo de rolo!',
                                trigger: 'pergunta-final',
                            },
                            {
                                id: 'atividades',
                                message: 'Você pode aproveitar passeios de jangada, mergulho e trilhas ecológicas.',
                                trigger: 'pergunta-final',
                            },
                            {
                                id: 'pergunta-final',
                                message: 'Posso ajudar com mais alguma informação?',
                                trigger: 'resposta-final',
                            },
                            {
                                id: 'resposta-final',
                                options: [
                                    { value: 'sim', label: 'Sim', trigger: 'tipo-pergunta' },
                                    { value: 'nao', label: 'Não', trigger: 'mensagem-fim' },
                                ],
                            },
                            {
                                id: 'mensagem-fim',
                                component: <Post />,
                                asMessage: true,
                                end: true,
                            },
                        ]}
                        {...config}
                    />
                )}
            </div>
            <div>
                <button className="btn" onClick={toggleChat}>
                    <i className={`fa fa-${showChat ? 'minus' : 'plus'}`}></i> {showChat ? 'Fechar Chat' : 'Iniciar Chat'}
                </button>
            </div>
        </ThemeProvider>
    );
};

export default Chatbot;
