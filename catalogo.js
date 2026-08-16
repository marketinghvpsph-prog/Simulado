// ============================================================
//  CATALOGO DE SIMULADOS
//
//  Este e o unico arquivo que voce mexe para incluir uma prova nova.
//  Cada bloco { ... } e um simulado.
//
//  id      -> apelido unico. E ele que separa os rankings.
//             NUNCA mude o id de um simulado que ja foi publicado,
//             senao o ranking daquele simulado se perde.
//             Padrao sugerido: materia-ano-mesano  (ex: mat-3ano-set26)
//  materia -> aparece em cima do titulo no menu
//  titulo  -> o assunto da prova
//  turma   -> "3º ano" (Giovanna) ou "4º ano" (Antonella)
//  cor     -> "verde" (3º ano) ou "roxo" (4º ano)
//  arquivo -> onde estao as perguntas, dentro da pasta perguntas/
//  ativo   -> true  = aparece em destaque, no topo
//             false = desce para "Provas anteriores"
//  sorteia -> quantas perguntas caem em cada partida.
//             Ex: banco de 50 com sorteia: 40 -> cada rodada tem 40,
//             sorteadas entre as 50. Se apagar esta linha, caem todas.
// ============================================================

const CATALOGO = [

  {
    id: "geo-3ano-ago26",
    materia: "Geografia",
    titulo: "Campo, cidade e paisagens",
    turma: "3º ano",
    cor: "verde",
    arquivo: "perguntas/geo-3ano-ago26.js",
    sorteia: 40,
    ativo: false,
  },

  {
    id: "geo-4ano-ago26",
    materia: "Geografia",
    titulo: "População e natureza",
    turma: "4º ano",
    cor: "roxo",
    arquivo: "perguntas/geo-4ano-ago26.js",
    sorteia: 40,
    ativo: false,
  },

  {
    id: "port-3ano-ago26",
    materia: "Português",
    titulo: "Leitura, ortografia e pontuação",
    turma: "3º ano",
    cor: "verde",
    arquivo: "perguntas/port-3ano-ago26.js",
    sorteia: 40,
    ativo: true,
  },

  {
    id: "port-4ano-ago26",
    materia: "Português",
    titulo: "Leitura, gramática e acentuação",
    turma: "4º ano",
    cor: "roxo",
    arquivo: "perguntas/port-4ano-ago26.js",
    sorteia: 40,
    ativo: true,
  },

  // ----------------------------------------------------------
  //  MODELO PARA COPIAR E COLAR NUMA PROVA NOVA
  //  Apague as barras // do começo de cada linha para ativar.
  // ----------------------------------------------------------
  // {
  //   id: "ing-4ano-set26",
  //   materia: "Inglês",
  //   titulo: "Simple present e Wh questions",
  //   turma: "4º ano",
  //   cor: "roxo",
  //   arquivo: "perguntas/ing-4ano-set26.js",
  //   sorteia: 20,
  //   ativo: true,
  // },

];
