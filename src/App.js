import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api.js';

function App() {
    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});

    function limitar() {
        if (input.length > 8) {
            setInput(input.substring(0, 7));
            console.log(input);
        }
    }
    limitar();
    async function handleSearch() {
        if (input !== '') {
            try {
                const r = await api.get(`${input}/json/`);
                if (r.data.cep) {
                    setCep(r.data);
                    setInput('');
                } else {
                    alert('Ops, CEP não encontrado!');
                    setInput('');
                }
            } catch {
                alert('Ops, erro ao buscar! ');
                setInput('');
            }
        } else {
            alert('Preencha algum Cep');
        }
    }
    return (
        <div className="container">
            <h1 className="title">Buscador CEP</h1>
            <div className="containerInput">
                <input
                    type="number"
                    placeholder="Exp.: 04846010"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    max={4}
                />

                <button className="buttonBusca" onClick={handleSearch}>
                    <FiSearch size={25} color="#FFF" />
                </button>
            </div>
            {Object.keys(cep).length > 0 && (
                <main className="main">
                    <h2>CEP: {cep.cep}</h2>
                    <span>{cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span>{cep.bairro}</span>
                    <span>
                        {cep.localidade} - {cep.uf}
                    </span>
                </main>
            )}
        </div>
    );
}

export default App;
