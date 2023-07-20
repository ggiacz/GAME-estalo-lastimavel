# **Estalo Lastimável**
Um jogo feito em javascript vanilla que simula algumas das mecânicas do jogo "Marvel Snaps" em uma temática de batalhas de ginásio pokémon.

- Você enfrentará um treinador trapaceiro em três batalhas simultâneas, junto ao seu fiel time de pokémons do tipo fogo. Quem sairá vitorioso?

## Como Jogar?
- Baixe o projeto para seu computador.
- Abra o arquivo index.html em um navegador.
- Clicar no botão para iniciar o jogo. O inimigo joga primeiro.
    - Lembre-se: Ele é trapaceiro. Ele não segue nenhuma regra de energia para jogar cartas.
- Clique na carta que deseja jogar para selecioná-la, e então clique no local que deseja jogá-la.
    - Só é possível jogar cartas caso tenha a energia necessária.
    - Um local não suporta mais do que 4 cartas jogadas nele.
- Ao clicar para passar o turno, o oponente joga novamente e sua energia é atualizada, seguindo o indicador do turno.
- Ao fim do jogo, ganha quem possuir mais locais (que são possuídos a partir da soma de poder das cartas ali jogadas.)
    - Em caso de empate de poder em um local, o oponente domina aquele local.

## Créditos
- Gabriel Giacomo (https://github.com/ggiacz)
- Mateus Santos (https://github.com/MateusNascimentoSantos)

## To-Do
- modificar o deck do oponente para um diferente ao do jogador.
    - fazer isso adicionando cartas extras a constante deck e modificando a variável deck_inimigo.
- corrigir bug na soma de resultado final, que as vezes erra. (não sei porque)
