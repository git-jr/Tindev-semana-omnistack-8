# Projeto Tindev - Semana Omnistack 8

Entre os dias 05 e 11 de agosto de 2019 rolou a 8° Semana Omnistack, o evento organizado pela Rocketseat voltando à stack React, React Native e NodeJS.

E para falar dessas tecnologias, ao longo da semana foram disponibilizadas aulas com muito conteúdo, visando construir uma aplicação funcional e multiplataforma de algo semelhante ao Tinder só que para programadores encontrarem seus próximos colaboradores, daí o nome “TinDev”.

Para mim foi uma semana de muito aprendizado e também de relembrar alguns conceitos, por isso várias partes do código ainda estão comentadas, mesmo que isso fira um pouco os princípios do Clean Code comentar o código que escrevo sempre me ajudou a aprender melhor😜

# O back-end 
Voltar a mexer com Node me lembrou um pouco sobre o app que fiz para meu canal do YouTube no fim de 2018, cara aqueles foram tempos legais, eu não tinha a mínima noção do que estava fazendo quando descobri que ia precisar usar cloud functions para gerenciar o envio de push notifications com o Firebase, (no fim das contas aprendi o que precisava e fiz funcionar). 
De volta ao tema... foi interessante ver as requisições usando a api do GitHub, para quem está aprendendo REST ver uma aplicação real usando os conceitos de POST/GET ajuda a visualizar e entender melhor seu funcionamento na minha opinião.

# O front-end 
Foi legal rever um pouco de html e css, que eu praticamente não digitei uma linha de código desde o ano passado quando terminei a faculdade, ver o React em ação aqui me fez ver com novos olhos o front.


# O app Mobilie!
A melhor parte para mim, tive a sorte de ter começado a estudar React-Native na semana passada então consegui extrair muita coisa boa dessa seção em específico, tenho gostado muito do que vi até agora com relação ao funcionamento dos apps feito em react, embora eu ainda seja muito apegado ao desenvolvimento nativo do Android.

# Juntando tudo e fazendo funcionar
O app consiste em duas telas, a primeira para login e cadastro exige que o desenvolvedor entre com seu nome de usuário do GitHub, fazemos uma requisição utilizando a API do mesmo (https://developer.github.com/v3) para buscar os dados públicos do programador em seu perfil (como foto do perfil e bio), armazenamos esses dados em nossa base utilizando o MongoDB( os bancos não relacionais completam tão bem as requisição REST não é mesmo?)
Uma vez que usuário insere seu nome ele passa a estar logado, pode ver o perfil de outros desenvolvedores também já cadastrados e escolher dar "like" ou "deslike" se desejar ou não trabalhar com a pessoa daquele perfil. Quando dois desenvolvedores dão "like" nos perfis um do outro uma mensagem de "match" aparece para ambos.


Enfim, foi uma semana bem proveitosa e cumpriu o objetivo de introduzir e atualizar uma galera no mundo dessa stack, após a semana é oferecido um treinamento mais extenso o “Bootcamp” ma$$$ por hora não vai rolar pra mim. Imagino que valha o investimento, quem sabe no futuro haha, até lá bora continuar nos estudos por fora.
