# 📱 Sistema de Apontamentos - Mobile

Aplicativo mobile desenvolvido com **React Native + Expo** com foco em auxiliar no processo de **apontamento de instalações de cabos** em usinas solares. O app permite que operadores realizem registros de forma prática e eficiente, mesmo em ambientes sem conexão com a internet.

---

## 🎯 Objetivo

Substituir o processo manual (planilhas físicas) por uma solução digital que permite ao operador:

- Autenticar-se no sistema
- Selecionar dados pré-carregados da instalação
- Registrar o apontamento de cabos no local da obra
- Armazenar os dados localmente em caso de falta de conexão
- Sincronizar os registros automaticamente ao reconectar à internet

---

## 🧰 Tecnologias e Bibliotecas Utilizadas

- **Expo** – Framework para desenvolvimento com React Native
- **React Native Paper** – UI Components com suporte a tema Material Design 3
- **React Hook Form + Zod** – Gerenciamento de formulários com validação robusta
- **AsyncStorage** – Persistência de dados offline
- **NetInfo** – Verificação de conectividade
- **Custom Hooks + Context API** – Organização e gerenciamento de estado (ex: `useSync`, `useAuth`, `useNetworkStatus`)
- **React Navigation** – Navegação entre telas
- **Axios** – Requisições HTTP para o backend
- **TypeScript** – Tipagem estática para maior segurança no código

---

## 🧱 Estrutura do Projeto

```
src/
├── assets/                      → Imagens e backgrounds
├── clients/                    → Serviços HTTP
├── components/                 → Componentes reutilizáveis
├── contexts/                   → Contextos globais
├── hooks/                      → Hooks personalizados
├── navigation/                 → Configurações de rotas
├── screens/                    → Páginas da aplicação
├── services/                   → Serviços locais
├── styles/                     → Temas e estilos globais
└── types/                      → Tipagens TypeScript compartilhadas
```

---

## ⚙️ Funcionalidades

- 🔐 **Login com matrícula e senha**
- 📥 **Carregamento inicial de dados do servidor**
- ✅ **Validação de formulários com feedback visual**
- 🛜 **Funciona offline (modo sem internet)**
- 🔁 **Sincronização automática e manual dos dados**
- 📊 **Exibição de status da rede e apontamentos pendentes**
- 🧾 **Registro de apontamentos com dados do segmento selecionado**
- 🎨 **Personalização de tema e fontes (Roboto)**

---

## 🚀 Como rodar o projeto

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Celular com **Expo Go** ou emulador Android/iOS

### ✅ Instalação

```bash
git clone https://github.com/seu-usuario/bn-apontamentos-mobile.git
cd bn-apontamentos-mobile
npm install
```

### ✅ Execução

```bash
npx expo start
```

Abra o QR Code com o app **Expo Go** no celular ou use um emulador.

---

## 🧪 Funcionalidades futuras

- 📊 Visualização de relatórios no próprio app
- ☁️ Upload de imagens da instalação
- 🔔 Notificações sobre falha ou sucesso na sincronização

---

## 🤝 Contribuição

Pull requests são bem-vindos! Sinta-se à vontade para sugerir melhorias, abrir issues ou colaborar com o código.

---

## 📄 Licença

Projeto privado - Uso autorizado apenas para fins educacionais.
