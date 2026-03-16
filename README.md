# App Construtora
Aplicativo mobile desenvolvido para clientes de uma construtora acompanharem seus empreendimentos e contratos.
O aplicativo permite visualizar informações do contrato, consultar parcelas futuras, acompanhar o progresso da obra através de fotografias e receber comunicados relacionados ao empreendimento.

## Status do Projeto
Projeto desenvolvido para fins de portfólio, baseado em um aplicativo real.
Dados sensíveis e integrações com APIs foram substituídos por mocks para preservar confidencialidade.

## Funcionalidades
- Visualização de contratos e dados do empreendimento.
- Consulta de parcelas futuras.
- Geração de boletos para pagamento.
- Acompanhamento do progresso da obra.
- Galeria de imagens da construção.
- Área de comunicados da obra.

## Tecnologias
- **React Native** → desenvolvimento do aplicativo mobile.
- **TypeScript** → tipagem estática e melhor organização do código.
- **React Navigation** → navegação entre telas.
- **Tailwind** → estilização dos componentes.

## Arquitetura do Projeto
O projeto segue uma organização baseada em separação de responsabilidades:

```
src
 ├── assets       → imagens, ícones e recursos estáticos do aplicativo.
 ├── components   → componentes reutilizáveis da interface.
 ├── navigation   → configuração de navegação entre telas.
 ├── screens      → telas principais do aplicativo.
 ├── services     → serviços responsáveis por fornecer dados (mock)
 └── types        → definições de tipos TypeScript utilizados no projeto.
```

## Desafios técnicos
- Estruturação da arquitetura do app para facilitar manutenção.
- Simulação de serviços e APIs utilizando **mock de dados**.
- Organização das camadas de **services, components e screens**.
- Implementação de navegação e gerenciamento de estado.
- Construção de componentes reutilizáveis.

## Conceitos aplicados
- Separação de responsabilidades.
- Consumo de serviços.
- Componentização.
- Gerenciamento de estado.
- Layout responsivo.

## Demonstração

### Tela de login
<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/3db48620-9e3a-4ed3-bb01-7cd6addd3569" />

### Página inicial
<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/dffb4aad-282d-46df-b6f7-c343ff4dd7f4" />
<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/6d4a44fa-21e1-417a-af05-ca1681c5c6bd" />

### Notificações
<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/b617809e-9974-42ea-98d9-7e9b99bf603b" />

### Tela de empreendimento
<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/200dfd94-7b5d-4016-ab7b-b619fce8ead8" />
<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/8f3fe736-02c8-4d90-ae3a-acb0958b6988" />

### Galeria do empreendimento
<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/438c32f0-8ee3-4e15-ae76-e5c219b640b9" />

## Como rodar o projeto

**Clone o repositório:**
```
git clone https://github.com/Matheus-Correa-Fiori/app-construtora
```

**Instale as dependências:**
```
npm install --legacy-peer-deps
```

**Limpe o build do Android:**
```
cd android
./gradlew clean
cd ..
```

**Inicie o Metro Bundler:**
```
npm start -- --reset-cache
```

**Execute o aplicativo:**
```
npx react-native run-android
```

## Observações
Este projeto não consome uma API real.
Todos os dados são simulados através de **mocks** localizados na pasta `src/services`.
