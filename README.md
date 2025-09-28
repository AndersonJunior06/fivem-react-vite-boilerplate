
# FiveM React Vite Boilerplate 1.5

Boilerplate para criar interfaces **NUI** no FiveM usando **React + Vite + TypeScript + Tailwindcss**, já pronto para comunicação entre **Lua ↔ React**.

## Estrutura do Projeto

```
fivem-react-vite-boilerplate-1.5/
│
├── fxmanifest.lua        # Configuração do recurso FiveM
├── client/
│   └── client.lua        # Código Lua do cliente
├── server/
│   └── server.lua        # Código Lua do servidor
└── web/
    ├── index.html        # HTML principal do front
    ├── vite.config.ts    # Configuração do Vite
    ├── package.json      # Dependências do front-end
    └── src/
        ├── global.d.tsx  # declara funções globais do ambiente FiveM que o TypeScript não conhece por padrão
        ├── index.css     # Adiciona as estilizações
        ├── main.tsx      # Entry do React
        ├── App.tsx       # Componente principal
        └── nui.ts        # Funções de comunicação com Lua
```

## Como Funciona

1. **React + Vite**: Frontend compilado pelo Vite gera a pasta `web/dist`.
2. **FiveM NUI**: `fxmanifest.lua` aponta para o `index.html` da pasta `dist`.
3. **Comunicação Lua ↔ React**:
   - Lua envia mensagens para o React via `SendNUIMessage`.
   - React envia eventos de volta para Lua via `fetch` + `RegisterNUICallback`.
4. **Hot Reload**: Durante desenvolvimento, você pode rodar o Vite com `npm run dev` para testar o frontend sem rebuild contínuo (precisa de proxy ou abrir HTML direto no navegador).
5. **AVISO**: ultima versao do tailwindcss ja instalado apenas precisa rodar `npm install`.

## Sobre `global.d.ts`

O arquivo `global.d.ts` declara funções globais do ambiente FiveM que o TypeScript não conhece por padrão.

Isso permite usar `GetParentResourceName` no React sem erros de compilação, sem gerar código extra. A função funciona normalmente dentro do FiveM NUI, e fora dele o código pode ser protegido com checagem de tipo:

Exemplo:

```ts
declare function GetParentResourceName(): string;
```
### **Aviso sobre desenvolvimento fora do FiveM**

Você pode alertar que, durante `npm run dev`, algumas funções do FiveM não estarão disponíveis:

```markdown
> ⚠️ Durante o desenvolvimento com `npm run dev`, funções do FiveM como `GetParentResourceName` e `SendNUIMessage` não estão disponíveis no navegador. Use `fetchNui` com checagem de tipo para evitar erros.
```

## Instalação e Uso

### 1. Extrair o .zip

```bash
unzip fivem-react-vite-boilerplate-1.5.zip -d resources/
```

### 2. Instalar dependências do frontend

```bash
cd resources/fivem-react-vite-boilerplate-1.5/web
npm install
```

### 3. Build do frontend

```bash
npm run build
```

### 4. Configurar o servidor FiveM

- Coloque a pasta `fivem-react-vite-boilerplate-1.5` dentro de `resources/`.
- No `server.cfg`, adicione:

```cfg
start fivem-react-vite-boilerplate-1.5
```

### 5. Testar no jogo

- Abra o jogo e digite `/nui` no chat.
- A interface NUI deve aparecer.
- Clique no botão para fechar a UI e enviar callback para Lua.

## Comunicação Lua ↔ React

**Lua → React**:

```lua
SendNUIMessage({ action = "open", data = { message = "Olá do Lua!" } })
```

**React → Lua**:

```ts
fetchNui("closeUI", { reason: "Usuário fechou" });
```

**Lua recebe callback**:

```lua
RegisterNUICallback("closeUI", function(data, cb)
    print("UI fechada por: " .. data.reason)
    cb("ok")
end)
```

## Scripts úteis

- `npm run dev` → inicia servidor Vite em modo dev
- `npm run build` → build de produção
- `/nui` → abre a interface NUI no FiveM

## Próximos passos

- Personalizar interface com React + Tailwind.
- Adicionar mais callbacks NUI.
- Integrar com dados do servidor ou banco de dados.
