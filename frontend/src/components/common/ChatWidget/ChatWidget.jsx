import { useState } from "react";
import "./ChatWidget.css";

function ChatWidget({
    messages = [],
    onSend,
    title = "Support"
}) {
    const [value, setValue] = useState("");

    const submit = () => {
        if (!value.trim()) {return;}
        onSend?.(value);
        setValue("");
    };

    return (
        <section className="chat-widget">
            <header className="chat-widget__header">
                <h2>{title}</h2>
            </header>

            <div className="chat-widget__messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-widget__message ${message.author === "user" ? "chat-widget__message--user" : ""}`}
                    >
                        <strong>{message.author}</strong>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            <footer className="chat-widget__footer">
                <input
                    type="text"
                    value={value}
                    placeholder="Votre message..."
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e)=>e.key==="Enter"&&submit()}
                />
                <button onClick={submit}>Envoyer</button>
            </footer>
        </section>
    );
}

export default ChatWidget;
