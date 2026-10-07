const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),out=path.join(root,'public');fs.mkdirSync(out,{recursive:true});
const preview=process.env.VERCEL_ENV!=='production';
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(preview){
 const start=html.indexOf('  function enviarNota(){');const end=html.indexOf('  // abas para trocar',start);assert(start>=0&&end>start,'Missing precise preview write boundary');
 html=html.slice(0,start)+'  function enviarNota(){ avisar("Prévia: sua nota não será gravada no ranking."); }\n\n'+html.slice(end);
 assert(!/method\s*:\s*["'](?:POST|PUT|PATCH|DELETE)/i.test(html),'Preview retains write path');
}
fs.writeFileSync(path.join(out,'index.html'),html);
for(const file of ['catalogo.js','config.js'])fs.copyFileSync(path.join(root,file),path.join(out,file));
fs.mkdirSync(path.join(out,'perguntas'),{recursive:true});for(const file of fs.readdirSync(path.join(root,'perguntas')))if(file.endsWith('.js'))fs.copyFileSync(path.join(root,'perguntas',file),path.join(out,'perguntas',file));
console.log('Built static app: '+(preview?'read-only preview':'production ranking preserved'));
