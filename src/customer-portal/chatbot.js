// chatbot.js

// Import OpenAI GPT API client
import { Configuration, OpenAIApi } from 'openai';

// Konfiguracja OpenAI API
const configuration = new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY', // Zastąp 'YOUR_OPENAI_API_KEY' Twoim kluczem API OpenAI
});

const openai = new OpenAIApi(configuration);

// Funkcja do wysyłania zapytania do chatbot
async function sendMessageToChatbot(message) {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7,
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Błąd podczas wysyłania zapytania do chatbot:', error);
        return 'Przepraszam, wystąpił błąd podczas przetwarzania Twojej wiadomości.';
    }
}

// Funkcja do obsługi wysyłania wiadomości przez użytkownika
function handleUserMessage(event) {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    // Dodaj wiadomość użytkownika do historii rozmów
    const chatHistory = document.getElementById('chatHistory');
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'user-message';
    userMessageElement.textContent = userInput;
    chatHistory.appendChild(userMessageElement);

    // Wyczyść pole wprowadzania
    document.getElementById('userInput').value = '';

    // Wyślij wiadomość do chatbot i odbierz odpowiedź
    sendMessageToChatbot(userInput).then(response => {
        // Dodaj odpowiedź chatbot do historii rozmów
        const chatbotMessageElement = document.createElement('div');
        chatbotMessageElement.className = 'chatbot-message';
        chatbotMessageElement.textContent = response;
        chatHistory.appendChild(chatbotMessageElement);
    });
}

// Dodaj nasłuchiwacz zdarzeń do formularza
document.getElementById('chatForm').addEventListener('submit', handleUserMessage);