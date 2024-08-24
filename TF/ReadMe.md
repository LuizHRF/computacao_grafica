# 1. Introdução
A ideia central do trabalho é desenvolver uma cena cartunizada em 3D que represente uma cena comum do mundo real. A proposta surge através da navegação em sites de inspirações de projetos em 3D. A arte produzida por Yiting Liu, “Low Poly Sheepfold With threeJS”, é feita utilizando de simples formas geométricas instânciadas de maneiras dierentes e organzidas de forma a criar uma bela cena. 

Com trabalho de Liu de inspiração, surge a ideia de representar uma pequena cena comum, utilizando de formas simples e de um conceito cartunizado, através das técnicas de computação gráfica e da biblioteca Three.js.

A paisagem escolhida para ser representada foi um moinho de vento, que possua aberturas como janelas e porta e também pás que giram na parte frontal. Além disso, criar uma pequena ambientação ao redor do moinho.

É esperado que ao final do trabalho exista uma cena manipulável através de controles de mouse que exiba um pequeno cenário com um moninho, uma pequena ambientação, e animação nas pás do moinho.

# 2. Objetivos Específicos

Ao final da produção do trabalho espera-se possuir uma cena que:

    • Possua iluminação adequada;
    • Represente cartunizadamente uma cena do mundo real (moinho de vento);
    • Possua câmera manipulável através dos controles de mouse;
    • Utilize de formas geométricas coloridas, alinhadas, posicionadas e de tamanho adequado para representar a cena proposta, fazendo uso do menor número de polígonos possível.
    • Possua um código que atenda às boas práticas de programação e seja otimizado;
    
# 3. Técnicas Propostas 
O projeto é executado utilizando uma biblioteca javaScript chamada ThreeJS. Three.js é uma biblioteca JavaScript que permite criar e exibir gráficos 3D em um navegador web. Utilizando WebGL (Web Graphics Library) como base, o Three.js simplifica muito o processo de criação de cenas 3D complexas, tornando-o acessível a desenvolvedores web sem necessidade de conhecimento profundo em WebGL.

Algumas funcionalidades implementadas pela biblioteca são a criaçao de cenas, instanciação de câmeras, renderizadores, luzes, objetos 3D e a criação de materiais com diferentes propriedades. Além disso,  abilbioteca possui algumas ferramentas que permitem importar texturas e imagens de fontes externas e aplicá-las nas cenas criadas no navegador.
Com base nessa bilbioteca e visando valer-se ao máximo de suas funcionalidaes,  projeto emprega as seguintes técnicas:

## 3.1. Dinâmicas de iluminação

Aplicar corretamente as técnicas de iluminação em uma cena computadorizada é essencial para que o resultado final seja satisfatório. Existem diversos tipos luzes implementadas pela biblioteca ThreeJs, entre elas estão a luz ambiente e também a luz direcional. 

A luz ambiente propõem-se a fazer a iluminação mais básica de uma cena, ela não é lançada a partir de um ponto especifico e ilumina a cena toda igualmente. Seu propósito é evitar que partes da cena se tornem completamente escuros devido à ausência de iluminação. É frequentemente usada em conjunto com outras luzes que proporcionam sombras e destaques, como luzes direcionais, para criar uma iluminação mais realista e interessante.

Outro modelo de iluminação utilizado é a luz direcional. A luz direcional (Directional Light) em Three.js é um tipo de luz que simula a luz proveniente de uma fonte distante, como o sol. A luz é emitida em linhas paralelas, o que significa que a direção e a intensidade da luz são constantes em toda a cena. Essa luz pode criar sombras e iluminar objetos de maneira específica, proporcionando um efeito mais realista.

Munida destas utiliades, a cena proposta no trabalho é iluminada de forma simples mas mesmo assim eficáz. Possui uma luz principal, que é uma luz direcional, simulando uma fonte de iluminação como sol da cena. Esta luz encarrega-se de tornar visíveis os objetos e também gerar sobras e reflexos. Além dela, uma luz ambiente é aplicada para garantir que pontos em que a luz pricnipal não age possuam visibilidade e não sejam sombrios.

## 3.2. Controle e posicionamento de câmera;

Outro ponto crucial para o desenvolvimento de uma cena em 3D é o posicionamento e dinâmicas da câmera. As decisões concernentes à visão da cena podem ser decisivas para que o efeito final seja como o desejado. O posicionamento da câmera determina quais objetos na cena receberão destaque e quais serão colocados em segundo plano. Além disso, um bom posicionamento da câmera permite ao usuário vivenciar a cena em sua totalidade.

A biblioteca javascript utilizada implementa diferentes tipos de câmera (perspectiva, ortográfica, cúbica, etc.) e a escolha do tipo correto é muito importante. A categoria de câmera utilizada para esse trabalho foi a Câmera Perspectiva. A câmera perspectiva no Three.js é um tipo de câmera que simula a perspectiva de visão humana, onde objetos mais distantes parecem menores do que objetos mais próximos. Esse tipo de câmera é ideal para criar cenas 3D realistas, pois imita a forma como nossos olhos percebem a profundidade e a dimensão.

Uma vez que o tipo de câmera foi escolhido, o seguinte passo é escolher seu posicionamento em cena. Durante o processo de desenvolvimento do projeto foi utilizada uma extensão do ThreeJS chamada OrbitControls. OrbitControls é uma classe em Three.js que permite o que o usuário interaja com a cena usando o mouse para orbitar, fazer zoom e pan, assim deixando a câmera livre pela cena. Ao final do desenvolvimento optou-se por prender a câmera a uma distância do foco da cena (moinho) e fazê-la orbitar por ele. Essa abordagem foi escolhida para evitar que fosse possível visualizar a cena de ângulos não favoráveis e notar aspectos não intencionais.

## 3.3. Uso de Skybox

Muitas vezes o foco de uma cena são apenas os objetos criados e posicionados, entretanto, estes objetos estarão inseridos num contexto de cena mais amplo, sendo possível visualizar o fundo da cena que por vezes estará vazio. Este é o caso desse projeto. O moinho que é o ponto focal da cena não está necessariamente atrelado à um plano de fundo específico. Entratanto, deixar o objeto principal desampardo sob um fundo branco não é a decisão mais visualmente agradável. Dessa forma, podemos inserir uma SkyBox na cena.

Uma Skybox é uma técnica usada em gráficos 3D para criar a ilusão de um ambiente infinito ao redor da cena. Ela envolve renderizar um cubo ao redor da câmera, com texturas aplicadas em cada uma das seis faces do cubo, representando o céu, horizonte e possivelmente o terreno ou o fundo. O objetivo é dar a sensação de um ambiente vasto e envolvente sem realmente modelar grandes quantidades de geometria.

Na cena produzida neste trabalho, foi utilizada uma imagem de céu, que através de um softeware online (Panorama to Cubemap) foi mapeada para as faces do cubo da Skybox e aplicada na cena.

## 3.4. Criação e uso de diferentes formas geométricas;

Um dos objetivos artísiticos dessa produção era criar uma cena utilizando de elementos simples e fazendo uso do menor número de polígonos possível. Desta forma, foram utilziadas poucas formas geométricas que foram instanciadas de forma diferente para que criasse-se a cena final. Neste sentido, nenhuma das formas vista na cena (com exceção da Skybox) foi importada de fontes externas.

Em Three.js, você pode criar uma variedade de formas geométricas para construir cenas 3D. A biblioteca oferece várias classes para gerar geometrias básicas e complexas, que podem ser usadas para criar objetos visuais interativos 

Todos os elementos da paisagem, dos pássaros às paredes do moinho, foram criados utilizando de alguma forma geométrica implementada pela bibliotca ThreeJS. Podem-se citar:

    • Base e topo do moinho: ambos foram feitos utilizando a geometria de um cilindro. Para criar esse efeito bastou reduzir o número de faces laterais do cilindro bem como modificar o raio de sua base e topo de acordo com o desejado.
    • Pás do moinho: utilizou-se a geometria de cilindro para criar as hastes e geometria de cubo para criar as lâminas. O cilindro teve seu raio bastante limitado, para que lembrasse um cabo de madeira e a caixa teve uma de suas dimensões reduzidas o suficiente para que parecesse um tecido fino preso as hastes.
    • Pedras e arbustos: tanto as pedras como os arbustos utilizaram de uma forma geométrica bastante versátil, o dodecaedro. Esse polígono de 12 faces permitiu que, através da modificação da escala em suas dimensões, fossem representadas as pedras e arbustos da cena.

Além dos exemplos citados foram utilizadas outras formas geométricas como a esfera, círculo e também formas livres.

## 3.5. Posicionamento em cena e conceitos geométricos;

O posicionamento de elementos em cena é inerentemente essencial para alcançar algum objetivo final. Para posicionar objetos em uma cena com ThreeJS, utiliza-se um sistema de coordenadas tridimensional, onde cada objeto é colocado em um ponto específico relativo à origem da cena.Além disso, é possível alterar a rotação e escala dos objetos para criar efeitos visuais mais complexos. A posição, rotação e escala de um objeto podem ser manipuladas independentemente, permitindo animações e transformações dinâmicas ao longo do tempo.

A priori, os elementos foram posicionados e rotacionados a contento e uma vez na posição correta, foram aninhados em um grupo representativo. Isto é, depois que estão atrelados a um grupo é possível mover e rotacionar todos os objetos daquele grupo de forma igual, assim permitindo que os elementos que devem permanecer juntos sofram as mesmas alterações sem distinção. Um exemplo disso é a maneira como os vidros das janelas estão conectados às suas molduras e como as pás do moinho estão agrupadas com seu suporte.

## 3.6. Dinâmica de materiais, texturas e colorimetria;

Os materiais podem ser aplciados às geometrias e controlam como a luz interage com a superfície de um objeto, determinando seu brilho, reflexão e textura. Existem diferentes tipos de materiais que podem ser aplicados aos objetos, cada um com propriedades específicas. Além disso, em Three.js, é possível definir a cor de um objeto diretamente através da propriedade ‘color’ de um material, especificando-a com um valor hexadecimal, RGB ou nome da cor. Isso permite personalizar a aparência dos objetos de acordo com o design da cena ou requisitos visuais específicos.

A técnica adotada para esse trabalho foi definir um conjunto de materiais e executar o projeto utlizando somente deles, sem criar novos materiais ao longo do caminho. Ao todo foram utilizados 9 materiasi diferentes que se dividem entre materias dop tipo ‘Pyshical’, que possuem características como reflectividade e grossura, e do tipo ‘toon’, que não possuem menos propriedades e têm uma aprência mais cartunizada. O número de materiais foi aumentando conforme as cores que precisavam ser representadas – é necessário criar um material para cor diferente que deseja-se aplciar.

Além dos materiais providenciados pela biblioteca ThreeJS também foi utilziada uma textura importada de fontes exterans. A textura vale-se de um mapa normal, mapa de oclusão de ambiente, mapa de altura e mapa de rugosidade. Além desses possui um mapa de cor que não foi utilziado pois era preferível aplicar uma coloração previamente definida. Essa textura objetiva lembrar a aparência de tijolos e foi utilizada nas paredes da base do moinho.

## 3.7. Animações

Além de criar e poscionar objetos, pode ser interessante fazer com eles possuam alguma movimentação ou sofram alguma alteração com o passar do tempo na cena. Animar objetos pode ser muito útil em diversas ocasiões.

Na cena criada para este trabalho, são feitas duas animações: a dos pássaros e a das pedras flutuantes. Ambas animações possuem um relógio como base e utilizam de funções trigonométricas (seno, cosseno, tangente) para limitar o movimento dos objetos ao mesmo tempo que proporciona alguma diversidade neles.

# 6. Resultado esperado

O projeto não se apropria de objetivos práticos, com seu grande foco sendo no aprendizado – das técnicas de computação gráfica e da biblioteca Three.js – e na criação de uma cena visualmente agradável. Após finalizar o desenvolvimento do trabalho é esperado que ele possa ser executado utilizando as bibliotecas e comandos básicos propostos pela prórpia biblioteca Three.js. Uma vez com seu servidor devidamente funcionando, deve ser possível visualizar em qualquer navegador o trabalho feito e também interagir com ele sem complicações de performance.

# 7. Referências

Documentação da biblioteca Three.js. Disponível em: https://threejs.org/docs/

Lewy Blue, Discover ThreeJS. Disponível em: https://discoverthreejs.com.

Yiting Liu,  Low Poly Sheepfold With threeJS. Disponível em: https://webartdevelopers.com/blog/low-poly-sheepfold-with-threejs.

Chidume Nnamdi, How to use lighting and WebGLRenderer in Three.js. 2020. Disponível em: https://blog.logrocket.com/how-to-use-lighting-and-renderers-in-three-js/.

Kerk Day, Three.js Lighting. 2020. Disponível em: https://medium.com/@joshdaycalgary/three-js-lighting-ffecfd7e6a32.

Gopisaikrishna Vuta, Exploring Cameras in Three.js. 2023. Disponível em: https://medium.com/@gopisaikrishna.vuta/exploring-cameras-in-three-js-32e268a6bebd.

Three.js Tutorials, Scene, Camera and Renderer. 2024. Disponível em: https://sbcode.net/threejs/scene-camera-renderer/.

MMD Skydome by amiamy111. Disponível em: https://www.deviantart.com/amiamy111/art/MMD-Skydome-306633085
