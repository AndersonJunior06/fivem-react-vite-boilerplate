-- Enviar mensagem para o React quando o jogador usar /nui
RegisterCommand("nui", function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "open",
        data = {
            message = "Olá do Lua 👋"
        }
    })
end)

-- Receber callback do React
RegisterNUICallback("closeUI", function(data, cb)
    SetNuiFocus(false, false)
    print("UI fechada pelo React, motivo: " .. data.reason)
    cb("ok")
end)
