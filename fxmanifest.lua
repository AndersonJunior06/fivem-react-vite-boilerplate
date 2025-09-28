fx_version 'cerulean'

description 'Boilerplate básico com React (TypeScript) & scripts Lua para FiveM NUI usando Vite'
author 'AndersonJunior06'
version '1.0.0'
repository 'https://github.com/AndersonJunior06/fivem-react-vite-boilerplate'

game 'gta5'

lua54 'yes'

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/assets/*'
}

client_script 'client/*.lua'
server_script 'server/*.lua'
