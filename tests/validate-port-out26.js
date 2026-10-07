const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..');const ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'catalogo.js'),'utf8')+';this.items=CATALOGO',ctx);
for(const [id,grade,patterns] of [
 ['port-4ano-out26','4º ano',[/ditongo|encontro vocálico/i,/-agem|ferrugem/i,/poema/i,/implícita|inferência/i]],
 ['port-3ano-out26','3º ano',[/sílaba tônica/i,/oxítona/i,/paroxítona/i,/proparoxítona/i,/implícita|inferência/i,/leia/i]]
]){
 const item=ctx.items.find(q=>q.id===id);assert(item,'Falta '+id);assert.equal(item.turma,grade);assert.equal(item.ativo,true);assert.equal(item.sorteia,40);
 let bank;vm.runInNewContext(fs.readFileSync(path.join(root,item.arquivo),'utf8'),{registrarPerguntas:(key,list)=>{assert.equal(key,id);bank=list}});
 assert.equal(bank.length,50);const prompts=new Set();for(const q of bank){assert.equal(q.alt.length,4);assert.equal(new Set(q.alt).size,4);assert(q.p.length>15);assert(!prompts.has(q.p));prompts.add(q.p);assert(Number.isInteger(q.correta)&&q.correta>=0&&q.correta<4);assert(!JSON.stringify(q).includes(String.fromCodePoint(0x2014)));}
 const text=JSON.stringify(bank);for(const pattern of patterns)assert(pattern.test(text),'Sem tópico '+pattern);
}
for(const id of ['geo-3ano-ago26','geo-4ano-ago26','port-3ano-ago26','port-4ano-ago26','cie-3ano-ago26','cie-4ano-ago26','ing-4ano-ago26'])assert(ctx.items.some(q=>q.id===id),'Histórico perdido '+id);
console.log('OK: Português outubro, duas séries, 50 questões por banco, sorteio de 40 e histórico preservado');
