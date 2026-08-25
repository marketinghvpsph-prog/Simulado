const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const root = path.resolve(__dirname, '..');

function loadCatalog() {
  const code = fs.readFileSync(path.join(root, 'catalogo.js'), 'utf8');
  const context = {};
  vm.runInNewContext(`${code}\nglobalThis.__catalogo = CATALOGO;`, context);
  return context.__catalogo;
}

function loadQuestions(file, expectedId) {
  let captured = null;
  const context = {
    registrarPerguntas(id, list) {
      captured = { id, list };
    },
  };
  const code = fs.readFileSync(path.join(root, file), 'utf8');
  vm.runInNewContext(code, context);
  assert(captured, `${file} não registrou perguntas`);
  assert.strictEqual(captured.id, expectedId, `${file} registrou id incorreto`);
  return captured.list;
}

const catalog = loadCatalog();
const ids = catalog.map((item) => item.id);
const required = [
  'geo-3ano-ago26',
  'geo-4ano-ago26',
  'port-3ano-ago26',
  'port-4ano-ago26',
  'cie-3ano-ago26',
  'cie-4ano-ago26',
  'ing-4ano-ago26',
];

for (const id of required) {
  assert(ids.includes(id), `catálogo sem ${id}`);
}
assert.strictEqual(new Set(ids).size, ids.length, 'ids duplicados no catálogo');

const byId = Object.fromEntries(catalog.map((item) => [item.id, item]));
assert.strictEqual(byId['geo-3ano-ago26'].ativo, false, 'Geografia do 3º ano deve permanecer em Provas anteriores');
assert.strictEqual(byId['geo-4ano-ago26'].ativo, false, 'Geografia do 4º ano deve permanecer em Provas anteriores');
assert.strictEqual(byId['port-3ano-ago26'].ativo, false, 'Português do 3º ano deve permanecer em Provas anteriores');
assert.strictEqual(byId['port-4ano-ago26'].ativo, false, 'Português do 4º ano deve permanecer em Provas anteriores');
assert.strictEqual(byId['cie-3ano-ago26'].ativo, true, 'Ciências do 3º ano deve ficar em destaque');
assert.strictEqual(byId['cie-4ano-ago26'].ativo, true, 'Ciências do 4º ano deve ficar em destaque');
assert.strictEqual(byId['ing-4ano-ago26'].ativo, true, 'Inglês do 4º ano deve ficar em destaque');

const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(indexHtml.includes('<script src="config.js"></script>'), 'index.html não carrega config.js');
assert(indexHtml.includes('<script src="catalogo.js"></script>'), 'index.html não carrega catalogo.js');
assert(indexHtml.includes('window.registrarPerguntas'), 'index.html não registra bancos de perguntas');

const newIds = new Set(['cie-3ano-ago26', 'cie-4ano-ago26', 'ing-4ano-ago26']);
for (const item of catalog) {
  const questions = loadQuestions(item.arquivo, item.id);
  assert(questions.length >= item.sorteia, `${item.id}: sorteia mais perguntas do que possui`);
  if (newIds.has(item.id)) {
    assert.strictEqual(questions.length, 50, `${item.id}: deve ter 50 questões`);
    assert.strictEqual(item.sorteia, 40, `${item.id}: deve sortear 40 questões`);
    assert.strictEqual(item.ativo, true, `${item.id}: deve aparecer na tela inicial`);
  }
  const prompts = new Set();
  questions.forEach((q, index) => {
    const label = `${item.id} questão ${index + 1}`;
    assert.strictEqual(typeof q.p, 'string', `${label}: enunciado ausente`);
    assert(q.p.trim().length >= 10, `${label}: enunciado curto demais`);
    assert(Array.isArray(q.alt), `${label}: alternativas ausentes`);
    assert.strictEqual(q.alt.length, 4, `${label}: precisa de quatro alternativas`);
    assert.strictEqual(new Set(q.alt).size, 4, `${label}: alternativas duplicadas`);
    assert(Number.isInteger(q.correta) && q.correta >= 0 && q.correta <= 3, `${label}: índice correto inválido`);
    assert(!prompts.has(q.p), `${label}: enunciado duplicado`);
    const contextReference = /(no texto|texto sobre|texto da|qual pista do texto|qual trecho é a melhor pista|como o conflito|complete a narrativa)/i;
    if (contextReference.test(q.p)) {
      assert(/leia|['"]/.test(q.p), `${label}: depende de um texto que pode não aparecer antes`);
    }
    const serialized = [q.p, ...q.alt].join('\n');
    assert(!/(^|\n|[:,.])\s*-\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/m.test(serialized), `${label}: usa hífen como marcador de fala`);
    assert(!serialized.includes(String.fromCodePoint(0x2014)), `${label}: contém caractere de travessão longo`);
    prompts.add(q.p);
  });
}

function joined(id) {
  const item = catalog.find((x) => x.id === id);
  const questions = loadQuestions(item.arquivo, item.id);
  return questions.flatMap((q) => [q.p, ...q.alt]).join(' ').toLowerCase();
}

const third = joined('port-3ano-ago26');
for (const pattern of [
  /explícita|escrita diretamente/,
  /implícita|inferência|pista/,
  /narrador/,
  /cenário/,
  /conflito|problema principal/,
  /substantivo/,
  /substantivo masculino|substantivo feminino|gênero do substantivo/,
  /bode.*cabra|boi.*vaca|cavalo.*égua|galo.*galinha/,
  /adjetivo/,
  /\bch\b|cachorro|chuva/,
  /\bnh\b|ninho|banho/,
  /\blh\b|folha|milho/,
  /antes de p e b|\bmp\b|\bmb\b/,
  /travessão|dois-pontos|diálogo/,
  /texto não verbal|símbolo|imagem/,
  /opinião.*porque|opinião.*justific/,
]) assert(pattern.test(third), `3º ano sem cobertura: ${pattern}`);

const thirdItem = catalog.find((x) => x.id === 'port-3ano-ago26');
const thirdQuestions = loadQuestions(thirdItem.arquivo, thirdItem.id);
const articleQuestion = thirdQuestions.find((q) =>
  /gênero do substantivo/i.test(q.p) && /artigos o e a/i.test(q.p)
);
assert(articleQuestion, '3º ano sem questão específica sobre artigos e gênero do substantivo');
assert.strictEqual(
  articleQuestion.alt[articleQuestion.correta],
  'o feijão e a farinha',
  '3º ano com gabarito incorreto na questão sobre artigos e gênero'
);

const fourth = joined('port-4ano-ago26');
for (const pattern of [
  /ideia central/,
  /ponto de vista|narrador-personagem/,
  /três porquinhos|releitura|paródia/,
  /agente/,
  /objeto da ação/,
  /concordância verbal/,
  /termina.*u|terminados em u|pensou|jogou/,
  /-esa|portuguesa|princesa/,
  /-eza|beleza|gentileza/,
  /oxítona/,
  /paroxítona/,
  /proparoxítona/,
  /onomatopeia|quadrinho|humor/,
  /travessão|dois-pontos|vírgula/,
  /comparando|nos dois trechos|têm em comum/,
  /personagem central/,
  /acento agudo/,
  /acento circunflexo/,
]) assert(pattern.test(fourth), `4º ano sem cobertura: ${pattern}`);

console.log(`OK: ${catalog.length} simulados validados; novos bancos com 50 questões cada.`);
