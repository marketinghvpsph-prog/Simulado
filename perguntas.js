// ============================================================
//  BANCO DE PERGUNTAS
//  Para editar: mude o texto, mantenha o formato.
//  "correta" e o numero da alternativa certa, comecando do ZERO.
//  (0 = primeira, 1 = segunda, 2 = terceira, 3 = quarta)
// ============================================================

const QUIZZES = {
  "3ano": {
    titulo: "Campo, cidade e paisagens",
    turma: "3º ano",
    cor: "verde",
    perguntas: [
      {
        p: "Em uma paisagem do espaço rural, o que predomina?",
        alt: [
          "Prédios altos e avenidas movimentadas",
          "Elementos naturais, como rios e vegetação",
          "Fábricas, shoppings e supermercados",
          "Semáforos, viadutos e pontes",
        ],
        correta: 1,
      },
      {
        p: "A atividade do campo que consiste na criação de animais chama-se:",
        alt: ["Agricultura", "Extrativismo", "Pecuária", "Comércio"],
        correta: 2,
      },
      {
        p: "E a atividade que usa o solo para cultivar vegetais?",
        alt: ["Agricultura", "Pecuária", "Indústria", "Piscicultura"],
        correta: 0,
      },
      {
        p: "Como se chama a coleta de recursos diretamente da natureza, sejam minerais, vegetais ou animais?",
        alt: ["Agroindústria", "Extrativismo", "Urbanização", "Artesanato"],
        correta: 1,
      },
      {
        p: "Para que serve o silo, aquela construção em forma de cilindro do espaço rural?",
        alt: [
          "Para abrigar os animais à noite",
          "Para armazenar grãos e forragem",
          "Para levar a produção até a cidade",
          "Para preparar o solo antes do plantio",
        ],
        correta: 1,
      },
      {
        p: "Qual é o rebanho que mais se destaca no Brasil em quantidade de animais?",
        alt: ["Bovinos", "Suínos", "Ovinos", "Galináceos"],
        correta: 3,
      },
      {
        p: "Quais animais formam o rebanho bovino?",
        alt: ["Bois e vacas", "Búfalos", "Cabras e bodes", "Ovelhas e carneiros"],
        correta: 0,
      },
      {
        p: "O iogurte, a manteiga e o queijo são fabricados a partir de qual matéria-prima?",
        alt: ["Milho", "Leite", "Algodão", "Soja"],
        correta: 1,
      },
      {
        p: "Qual destes produtos é um subproduto do milho?",
        alt: ["Fubá", "Suco concentrado", "Aço", "Couro"],
        correta: 0,
      },
      {
        p: "Qual comunidade tradicional vive na área litorânea e pratica a pesca no mar?",
        alt: ["Ribeirinhos", "Sertanejos", "Caiçaras", "Quilombolas"],
        correta: 2,
      },
      {
        p: "E qual comunidade vive nas margens dos rios, tendo a pesca artesanal como principal atividade?",
        alt: ["Ribeirinhos", "Caiçaras", "Sertanejos", "Povos indígenas"],
        correta: 0,
      },
      {
        p: "Os sertanejos vivem em qual região do Brasil?",
        alt: [
          "No sertão, no interior do Nordeste",
          "No litoral do Sul",
          "Na Amazônia",
          "Nas grandes capitais",
        ],
        correta: 0,
      },
      {
        p: "Quem são os quilombolas?",
        alt: [
          "Os primeiros habitantes do Brasil",
          "Descendentes dos povos africanos que foram escravizados",
          "Pescadores que vivem no litoral",
          "Moradores das grandes cidades",
        ],
        correta: 1,
      },
      {
        p: "No início, a agricultura e a pecuária eram realizadas principalmente com:",
        alt: [
          "Tratores e colheitadeiras",
          "Drones e robôs",
          "A força muscular humana",
          "Energia elétrica",
        ],
        correta: 2,
      },
      {
        p: "Segundo o Censo de 2022, a maior parte da população brasileira vive:",
        alt: [
          "No espaço rural",
          "No espaço urbano",
          "Dividida igualmente entre campo e cidade",
          "Em comunidades tradicionais",
        ],
        correta: 1,
      },
      {
        p: "Como se chama a saída das pessoas do campo em direção à cidade?",
        alt: ["Interdependência", "Êxodo rural", "Extrativismo", "Miscigenação"],
        correta: 1,
      },
      {
        p: "Qual destes é um problema causado pela urbanização acelerada?",
        alt: [
          "Menos desemprego nas cidades",
          "Mais espaço para todos morarem",
          "Habitações precárias e alagamentos",
          "Diminuição da população urbana",
        ],
        correta: 2,
      },
      {
        p: "A plataforma que extrai petróleo do mar é um exemplo de indústria:",
        alt: ["Extrativa", "De transformação", "Têxtil", "Alimentícia"],
        correta: 0,
      },
      {
        p: "A siderúrgica transforma o minério de ferro em:",
        alt: ["Tecido", "Aço", "Açúcar", "Papel"],
        correta: 1,
      },
      {
        p: "Qual situação mostra a interdependência entre o campo e a cidade?",
        alt: [
          "O campo não precisa de nada que vem da cidade",
          "A cidade produz sozinha todos os alimentos que consome",
          "Os alimentos produzidos no campo são consumidos na cidade",
          "Quem vive no campo não usa produtos industrializados",
        ],
        correta: 2,
      },
    ],
  },

  "4ano": {
    titulo: "População e natureza",
    turma: "4º ano",
    cor: "roxo",
    perguntas: [
      {
        p: "Nos mapas de densidade demográfica, as cores mais escuras indicam:",
        alt: [
          "Áreas com pouquíssimos habitantes",
          "Áreas de alta concentração de pessoas",
          "Áreas cobertas por florestas",
          "Áreas de relevo mais elevado",
        ],
        correta: 1,
      },
      {
        p: "Por já habitarem o território antes da chegada dos colonizadores, os povos indígenas são chamados de povos nativos ou:",
        alt: ["Migrantes", "Imigrantes", "Autóctones", "Colonizadores"],
        correta: 2,
      },
      {
        p: "Como se chama o processo de mistura entre os povos que formou o povo brasileiro?",
        alt: ["Urbanização", "Miscigenação", "Desertificação", "Demarcação"],
        correta: 1,
      },
      {
        p: "Em que parte do território brasileiro se iniciou a ocupação do espaço geográfico?",
        alt: [
          "No interior do Centro-Oeste",
          "No litoral da atual UF da Bahia",
          "Na região amazônica",
          "No litoral do Rio Grande do Sul",
        ],
        correta: 1,
      },
      {
        p: "Para que servia o pau-brasil, explorado no início da colonização?",
        alt: [
          "Para extrair uma tinta vermelha usada para tingir tecidos",
          "Para fabricar perfumes",
          "Para produzir açúcar",
          "Para construir navios de guerra",
        ],
        correta: 0,
      },
      {
        p: "Os planaltos correspondem, no Brasil, a locais situados em média entre:",
        alt: [
          "0 e 50 metros acima do nível do mar",
          "200 e 800 metros acima do nível do mar",
          "2.000 e 8.000 metros acima do nível do mar",
          "Áreas abaixo do nível do mar",
        ],
        correta: 1,
      },
      {
        p: "As planícies são áreas essencialmente planas porque foram preenchidas por:",
        alt: ["Sedimentos", "Águas subterrâneas", "Lava vulcânica", "Vegetação"],
        correta: 0,
      },
      {
        p: "O que caracteriza uma depressão do relevo?",
        alt: [
          "Ter altitudes inferiores às das outras áreas ao seu redor",
          "Ser a área mais alta da região",
          "Estar sempre coberta por gelo",
          "Ser formada apenas por rochas",
        ],
        correta: 0,
      },
      {
        p: "Quem é o agente antrópico que modifica o relevo?",
        alt: ["O vento", "O ser humano", "Os rios", "Os vulcões"],
        correta: 1,
      },
      {
        p: "A erupção vulcânica, o vento e a água da chuva são exemplos de agentes:",
        alt: ["Antrópicos", "Naturais", "Industriais", "Urbanos"],
        correta: 1,
      },
      {
        p: "Como se chama o local de maior altitude do relevo onde o rio nasce?",
        alt: ["Foz", "Nascente", "Várzea", "Eclusa"],
        correta: 1,
      },
      {
        p: "E o lugar em que o rio deságua ou termina, que pode ser um lago, outro rio ou um oceano?",
        alt: ["Nascente", "Planalto", "Foz", "Aquífero"],
        correta: 2,
      },
      {
        p: "Os rios de planície são mais utilizados para:",
        alt: [
          "A navegação, porque suas águas são mais calmas",
          "A produção de energia elétrica",
          "A mineração",
          "A criação de búfalos",
        ],
        correta: 0,
      },
      {
        p: "Já os rios de planalto são muito aproveitados para:",
        alt: [
          "A navegação de grandes navios",
          "A produção de energia elétrica",
          "O cultivo de arroz",
          "A pesca artesanal",
        ],
        correta: 1,
      },
      {
        p: "O que é uma eclusa?",
        alt: [
          "Um tipo de vegetação da Caatinga",
          "Um sistema que funciona como elevador e transporta embarcações pelos desníveis",
          "Uma área de relevo muito baixa",
          "Um reservatório de água subterrânea",
        ],
        correta: 1,
      },
      {
        p: "Qual é o maior bioma do Brasil?",
        alt: ["Cerrado", "Mata Atlântica", "Amazônia", "Pantanal"],
        correta: 2,
      },
      {
        p: "Qual bioma é considerado o mais devastado do país, por ter sido a primeira área natural modificada para cultivos e cidades?",
        alt: ["Amazônia", "Mata Atlântica", "Caatinga", "Pampas"],
        correta: 1,
      },
      {
        p: "Na Caatinga, os rios que secam ao longo de seu curso são chamados de rios:",
        alt: ["Temporários", "Navegáveis", "Subterrâneos", "de Planalto"],
        correta: 0,
      },
      {
        p: "Qual bioma fica alagado boa parte do ano e é uma das maiores planícies alagáveis do mundo?",
        alt: ["Cerrado", "Pampas", "Pantanal", "Amazônia"],
        correta: 2,
      },
      {
        p: "Segundo o Censo 2022, qual UF tem o maior número de comunidades remanescentes de quilombos?",
        alt: ["São Paulo", "Maranhão", "Espírito Santo", "Pernambuco"],
        correta: 1,
      },
    ],
  },
};
