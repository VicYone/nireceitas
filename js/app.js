// ═══════════ CONFIGURAÇÃO — troque aqui ═══════════
const SITE = {
  nome: 'Ni', destaqueNome: 'receitas',          // aparece como "Nireceitas" no logo, com "receitas" em laranja
  slogan: 'Receitas testadas para todas as refeições do dia',
  whatsapp: '5511999999999',                    // DDI + DDD + número, só dígitos (troque pelo seu)
  mensagemWhatsapp: 'Olá! Vim pelo site de receitas e queria falar com vocês.',
  receitaDestaque: 'feijoada',                   // id da receita grande no topo da página inicial
  mostrarAnuncios: true,                         // false esconde todos os espaços de publicidade
};
// ════════════════════════════════════════════════════

const ICONE_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.86 9.86 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></svg>';
const ICONE_RELOGIO = '⏱', ICONE_PORCAO = '🍽', ICONE_NIVEL = '📊';

const $ = (s, el = document) => el.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const foto = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const refeicao = (id) => REFEICOES.find((r) => r.id === id);
const linkWa = (texto) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;
const linkReceita = (r) => `receita.html?id=${r.id}`;

// Espaço reservado para publicidade. data-slot identifica cada posição para quando o AdSense (ou outro) for ligado.
function anuncio(tipo, tamanho, slot) {
  if (!SITE.mostrarAnuncios) return '';
  return `<div class="anuncio anuncio--${tipo}" data-slot="${slot}" aria-hidden="true"><div>Publicidade<span>${tamanho}</span></div></div>`;
}

function meta(r) {
  return `<div class="meta"><span>${ICONE_RELOGIO} ${r.tempo}</span><span>${ICONE_NIVEL} ${r.dificuldade}</span><span>${ICONE_PORCAO} ${r.porcoes}</span></div>`;
}

function card(r) {
  return `<a class="card" href="${linkReceita(r)}" data-busca="${esc((r.titulo + ' ' + r.resumo + ' ' + r.ingredientes.flatMap((g) => g.itens).join(' ')).toLowerCase())}">
    <div class="card-foto"><img src="${foto(r.foto, 600)}" alt="${esc(r.titulo)}" loading="lazy"></div>
    <div class="card-corpo"><h3>${esc(r.titulo)}</h3>${meta(r)}</div></a>`;
}

function mini(r) {
  return `<a class="mini" href="${linkReceita(r)}"><img src="${foto(r.foto, 300)}" alt="" loading="lazy"><div><span class="selo">${refeicao(r.refeicao).nome}</span><h3>${esc(r.titulo)}</h3>${meta(r)}</div></a>`;
}

function cabecalho(ativo) {
  const logo = `<a class="logo" href="index.html"><span class="logo-marca">🥘</span>${SITE.nome}<em>${SITE.destaqueNome}</em></a>`;
  return `<header class="topo">
    <div class="container topo-linha">${logo}
      <form class="busca" action="index.html" role="search"><input type="search" name="q" placeholder="O que você quer cozinhar hoje?" aria-label="Buscar receitas"><button type="submit">Buscar</button></form>
    </div>
    <nav class="menu"><div class="container"><ul>
      ${REFEICOES.map((r) => `<li><a href="index.html#${r.id}" class="${r.id === ativo ? 'ativo' : ''}">${r.nome}</a></li>`).join('')}
    </ul></div></nav>
  </header>`;
}

function faixaWhatsapp() {
  return `<section class="faixa-wa"><div class="container">
    <div><h2>Ficou com dúvida em alguma receita?</h2><p>Chama a gente no WhatsApp. Respondemos rapidinho.</p></div>
    <a class="botao botao--wa" href="${linkWa(SITE.mensagemWhatsapp)}" target="_blank" rel="noopener">${ICONE_WA} Falar no WhatsApp</a>
  </div></section>`;
}

function rodape() {
  return `${anuncio('rodape', '970 × 250 · 320 × 100 no celular', 'rodape')}
  <footer class="rodape"><div class="container">
    <div class="rodape-grade">
      <div><a class="logo" href="index.html"><span class="logo-marca">🥘</span>${SITE.nome}<em>${SITE.destaqueNome}</em></a><p>${SITE.slogan}.</p></div>
      <div><h4>Refeições</h4><ul>${REFEICOES.map((r) => `<li><a href="index.html#${r.id}">${r.nome}</a></li>`).join('')}</ul></div>
      <div><h4>Contato</h4><ul><li><a href="${linkWa(SITE.mensagemWhatsapp)}" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="#">Anuncie aqui</a></li><li><a href="#">Política de privacidade</a></li></ul></div>
    </div>
    <div class="rodape-base"><span>© ${new Date().getFullYear()} ${SITE.nome}${SITE.destaqueNome}. Todos os direitos reservados.</span><span>Fotos: Unsplash</span></div>
  </div></footer>
  <a class="wa-flutuante" href="${linkWa(SITE.mensagemWhatsapp)}" target="_blank" rel="noopener" aria-label="Fale conosco no WhatsApp">${ICONE_WA}<span>Fale com a gente</span></a>`;
}

// ═══════════ PÁGINA INICIAL ═══════════
function paginaInicial() {
  const d = RECEITAS.find((r) => r.id === SITE.receitaDestaque) || RECEITAS[0];
  const lado = ['bolo-de-cenoura', 'strogonoff-de-frango', 'pudim-de-leite'].map((id) => RECEITAS.find((r) => r.id === id)).filter(Boolean);

  const secoes = REFEICOES.map((ref, i) => {
    const lista = RECEITAS.filter((r) => r.refeicao === ref.id);
    // anúncio entre seções, depois da 2ª e da 4ª
    const pub = i === 1 || i === 3 ? `<div class="container">${anuncio('faixa', '728 × 90 · 320 × 100 no celular', 'entre-secoes-' + i)}</div>` : '';
    return `<section class="secao" id="${ref.id}" data-secao><div class="container">
      <div class="secao-cabeca"><div><h2 class="titulo-secao"><span class="icone-secao">${ref.icone}</span>${ref.nome}</h2><p>${ref.chamada}</p></div>
        <a class="botao botao--contorno" href="${linkReceita(lista[0])}">Ver receita do dia</a></div>
      <div class="grade">${lista.map(card).join('')}</div>
    </div></section>${pub}`;
  }).join('');

  document.body.innerHTML = `${cabecalho()}
  <main>
    <div class="container">${anuncio('topo', '970 × 90 · 320 × 100 no celular', 'topo')}</div>
    <section class="destaque"><div class="container destaque-grade">
      <a class="destaque-principal" href="${linkReceita(d)}"><img src="${foto(d.foto, 1200)}" alt="${esc(d.titulo)}">
        <div class="destaque-texto"><span class="selo">Receita da semana</span><h1>${esc(d.titulo)}</h1><p>${esc(d.resumo)}</p>
        ${meta(d)}</div></a>
      <div class="destaque-lado">${lado.map(mini).join('')}</div>
    </div></section>
    <section class="atalhos"><div class="container"><h2 class="titulo-secao">O que você vai preparar?</h2>
      <div class="atalhos-lista">${REFEICOES.map((r) => `<a class="atalho" href="#${r.id}"><span class="atalho-icone">${r.icone}</span>${r.nome}</a>`).join('')}</div>
    </div></section>
    <p class="vazio" id="vazio">Nenhuma receita encontrada. Tente outro ingrediente.</p>
    ${secoes}
  </main>
  ${faixaWhatsapp()}${rodape()}`;

  // Busca: filtra os cards por título, resumo e ingredientes
  const campo = $('.busca input');
  const filtrar = () => {
    const termo = campo.value.trim().toLowerCase();
    let total = 0;
    document.querySelectorAll('[data-secao]').forEach((sec) => {
      let n = 0;
      sec.querySelectorAll('.card').forEach((c) => { const ok = !termo || c.dataset.busca.includes(termo); c.style.display = ok ? '' : 'none'; n += ok; });
      sec.style.display = n ? '' : 'none';
      total += n;
    });
    $('.destaque').style.display = $('.atalhos').style.display = termo ? 'none' : '';
    $('#vazio').classList.toggle('visivel', !total);
  };
  $('.busca').addEventListener('submit', (e) => { e.preventDefault(); filtrar(); const s = document.querySelector('[data-secao]:not([style*="none"])'); if (s) s.scrollIntoView(); });
  campo.addEventListener('input', filtrar);
  const q = new URLSearchParams(location.search).get('q');
  if (q) { campo.value = q; filtrar(); }
}

// ═══════════ PÁGINA DE RECEITA ═══════════
function paginaReceita() {
  const r = RECEITAS.find((x) => x.id === new URLSearchParams(location.search).get('id'));
  if (!r) { location.replace('index.html'); return; }
  const ref = refeicao(r.refeicao);
  const total = r.ingredientes.reduce((n, g) => n + g.itens.length, 0);
  document.title = `${r.titulo} | ${SITE.nome}${SITE.destaqueNome}`;
  $('meta[name=description]').content = r.resumo;

  const ingredientes = r.ingredientes.map((g) => `${g.grupo ? `<h3>${esc(g.grupo)}</h3>` : ''}<ul class="ingredientes">${g.itens.map((i) => `<li><label><input type="checkbox"><span>${esc(i)}</span></label></li>`).join('')}</ul>`).join('');
  const preparo = r.preparo.map((g) => `${g.grupo ? `<h3>${esc(g.grupo)}</h3>` : ''}<ol class="passos">${g.passos.map((p) => `<li><span>${esc(p)}</span></li>`).join('')}</ol>`).join('');
  const mesmas = RECEITAS.filter((x) => x.refeicao === r.refeicao && x.id !== r.id);
  const outras = RECEITAS.filter((x) => x.refeicao !== r.refeicao).sort(() => Math.random() - .5).slice(0, 4);
  const textoWa = `Olha essa receita de ${r.titulo}: ${location.href}`;

  document.body.innerHTML = `${cabecalho(r.refeicao)}
  <main class="container">
    ${anuncio('topo', '970 × 90 · 320 × 100 no celular', 'receita-topo')}
    <nav class="trilha"><a href="index.html">Receitas</a> › <a href="index.html#${ref.id}">${ref.nome}</a> › ${esc(r.titulo)}</nav>
    <div class="receita-grade">
      <article>
        <header class="receita-cabeca">
          <span class="selo">${ref.icone} ${ref.nome}</span>
          <h1>${esc(r.titulo)}</h1>
          <div class="avaliar"><span>Avalie esta receita:</span><span class="estrelas" id="estrelas">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-n="${n}" aria-label="${n} estrela${n > 1 ? 's' : ''}">★</button>`).join('')}</span><span id="nota-msg"></span></div>
          <div class="ficha">
            <div><small>Tempo</small><strong>${r.tempo}</strong></div>
            <div><small>Rendimento</small><strong>${r.porcoes}</strong></div>
            <div><small>Dificuldade</small><strong>${r.dificuldade}</strong></div>
            <div><small>Custo</small><strong>${r.custo}</strong></div>
          </div>
          <div class="acoes">
            <a class="botao botao--wa" href="${linkWa(textoWa)}" target="_blank" rel="noopener">${ICONE_WA} Compartilhar no WhatsApp</a>
            <button class="botao botao--contorno" type="button" onclick="window.print()">🖨 Imprimir</button>
          </div>
        </header>
        <div class="receita-foto"><img src="${foto(r.foto, 1200)}" alt="${esc(r.titulo)}"></div>
        <p class="receita-intro">${esc(r.resumo)}</p>

        <section class="bloco"><h2>Ingredientes <small>(${total} itens · ${r.porcoes})</small></h2>${ingredientes}</section>
        <section class="bloco"><h2>Utensílios</h2><ul class="utensilios">${r.utensilios.map((u) => `<li>${esc(u)}</li>`).join('')}</ul></section>
        ${anuncio('retangulo', '300 × 250', 'receita-meio')}
        <section class="bloco"><h2>Modo de preparo</h2>${preparo}</section>
        ${r.dicas.length ? `<section class="bloco dicas"><h2>💡 Dicas</h2><ul>${r.dicas.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></section>` : ''}
        ${anuncio('faixa', '728 × 90 · 320 × 100 no celular', 'receita-pos-preparo')}
        ${r.faq.length ? `<section class="bloco faq"><h2>Perguntas frequentes</h2>${r.faq.map(([p, a]) => `<details><summary>${esc(p)}</summary><p>${esc(a)}</p></details>`).join('')}</section>` : ''}
      </article>
      <aside class="receita-lado">
        ${anuncio('lateral', '300 × 600', 'receita-lateral')}
        <div class="lado-lista"><h3>Mais receitas de ${ref.nome.toLowerCase()}</h3>${mesmas.map(mini).join('')}</div>
      </aside>
    </div>
    <section class="bloco veja-tambem"><h2 class="titulo-secao">Veja também</h2><div class="grade" style="margin-top:20px">${outras.map(card).join('')}</div></section>
  </main>
  ${faixaWhatsapp()}${rodape()}`;

  // Avaliação por estrelas: guarda a nota de quem está vendo neste navegador
  const chave = 'nota-' + r.id;
  const pintar = (n) => document.querySelectorAll('#estrelas button').forEach((b) => b.classList.toggle('cheia', +b.dataset.n <= n));
  let nota = 0;
  try { nota = +localStorage.getItem(chave) || 0; } catch (e) {}
  pintar(nota);
  if (nota) $('#nota-msg').textContent = 'Obrigado pela avaliação!';
  $('#estrelas').addEventListener('click', (e) => {
    const n = +e.target.dataset.n; if (!n) return;
    pintar(n); $('#nota-msg').textContent = 'Obrigado pela avaliação!';
    try { localStorage.setItem(chave, n); } catch (err) {}
  });

  // Dados estruturados de receita (o Google usa para mostrar foto, tempo e passos na busca)
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Recipe', name: r.titulo, description: r.resumo, image: [foto(r.foto, 1200)],
    totalTime: `PT${r.tempoMin}M`, recipeYield: r.porcoes, recipeCategory: ref.nome, recipeCuisine: 'Brasileira',
    recipeIngredient: r.ingredientes.flatMap((g) => g.itens),
    recipeInstructions: r.preparo.flatMap((g) => g.passos).map((t) => ({ '@type': 'HowToStep', text: t })),
  });
  document.head.appendChild(ld);
}
