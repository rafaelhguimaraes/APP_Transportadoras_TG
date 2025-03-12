# Trabalho de TG - Transportadora
### Este projeto consiste em um mapa de transporte entre cidades de Minas Gerais, utilizando o algoritmo Ford-Fulkerson para calcular o fluxo máximo de carga entre duas cidades selecionadas pelo usuário.
![Mapa de Transporte](image.png)
### Arquivos do projeto
- index.html: Este arquivo contém a estrutura HTML da página, onde são importados os estilos CSS, as bibliotecas JavaScript necessárias (Bootstrap, jQuery, Popper.js, vis.js) e os scripts personalizados (script.js e js-graphs.js). Ele também possui os elementos da interface, como o seletor de cidades, o botão de cálculo do fluxo máximo e o contêiner para exibir o mapa de transporte.

- script.js: Este arquivo contém o código JavaScript responsável por criar o grafo de transporte e executar o algoritmo Ford-Fulkerson para calcular o fluxo máximo entre as cidades selecionadas pelo usuário. Ele também manipula a exibição do resultado do cálculo e cria o mapa de transporte usando a biblioteca vis.js.

- public/styles.css: Este arquivo contém os estilos CSS utilizados na página, como a definição da fonte, a formatação dos títulos, a aparência dos elementos de interface e a definição das cores de fundo.

- js-graphs.js: Esta é uma biblioteca JavaScript utilizada no projeto para implementar o algoritmo Ford-Fulkerson e fornecer funcionalidades relacionadas a grafos e fluxos de rede.

### Como executar o projeto
1. Faça o download dos arquivos index.html, script.js, public/styles.css e js-graphs.js e armazene-os em um mesmo diretório.

2. Abra o arquivo index.html em um navegador web compatível.

3. No seletor "Source", selecione a cidade de origem desejada.

4. No seletor "Target", selecione a cidade de destino desejada.

5. Clique no botão "Calcular Fluxo Máximo" para iniciar o cálculo.

6. O resultado do cálculo será exibido no elemento <h2> com o id "fluxo-maximo".

7. A rota recomendada, quando aplicável, será exibida no elemento <h2> com o id "rota".

8. O mapa de transporte será exibido no elemento com o id "mynetwork".

### Ferramentas utilizadas
O projeto utiliza as seguintes bibliotecas externas:

- Bootstrap (CSS)
- jQuery
- Popper.js
- vis.js

Certifique-se de ter uma conexão com a internet para carregar as bibliotecas externas corretamente.

### Observações

O arquivo js-graphs.js é uma biblioteca JavaScript que contém a implementação do algoritmo Ford-Fulkerson e outras funcionalidades relacionadas a grafos e fluxos de rede. Certifique-se de que ele esteja presente no mesmo diretório do restante dos arquivos do projeto.

As distâncias entre as cidades de Minas Gerais estão definidas no código do arquivo script.js, na variável distances. Caso queira alterar as distâncias, basta modificar os valores nessa matriz.

O arquivo script.js é responsável por criar o grafo de transporte e executar o algoritmo Ford-Fulkerson. Caso deseje fazer modificações no algoritmo ou no grafo, esse é o arquivo a ser editado.

Os estilos CSS estão definidos no arquivo public/styles.css. Caso queira personalizar a aparência da página, você pode fazer alterações nesse arquivo.

Certifique-se de ter as permissões necessárias para executar os arquivos em seu sistema.

Este projeto foi desenvolvido para ser executado em um navegador web.
