var BROWSER_BOT = 'adb_bot1@testrun.org';

function mailto(dest, body){
    return `mailto:${dest}?body=${encodeURIComponent(body)}`;
};
function browser(url){
    return mailto(BROWSER_BOT, url);
};
/*
var HISTORY = {
    h: [], // max length: 4
    i: 0,
    l: function(){
        return this.h.length
    },
    a: function(){
        return this.h[this.i]
    }
};*/

var HISTORY = {
    history: [], // max length: 4
    cursor: -1,
    location: function () {
        return this.history[this.cursor]
    },
    go: function (href) {
        
    },
    back: function () {
        if (this.cursor > -1) {
            this.cursor = this.cursor - 1;
            loadPage(this.location(), 'data/', true);
        }
    },
    forward: function () {
        if (this.cursor < this.history.length-1) {
            this.cursor = this.cursor + 1;
            loadPage(this.location(), 'data/', true);
        }
    }
};

function smoothscroll(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
}

/*
function backwardPage(){ // atrás
    window.history.back();
    if (HISTORY.i > 0){
        HISTORY.i-=1;
        //loadPage(HISTORY.a(), h=false)
    }
};
function forwardPage(){ // adelante
    window.history.foward();
    if (HISTORY.i < HISTORY.l()){
        HISTORY.i+=1;
        //loadPage(HISTORY.a(), h=false)
    }
};*/

/*
function backwardPage(){
    if (!HISTORY.i){
        if(HISTORY.h[HISTORY.i-1] !== HISTORY.a()){
            HISTORY.i--;
            loadPage(HISTORY.a())
        }
    }
};

function forwardPage(){
    if (HISTORY.i < HISTORY.l()){
        if(HISTORY.h[HISTORY.i+1] !== HISTORY.a()){
            HISTORY.i++;
            loadPage(HISTORY.a())
        }
    }
};*/

function loadPage(file, path='data/', go=false) {
    //if(HISTORY.h[HISTORY.i] !== file){
    /*if (HISTORY.a() === file){
        return false
    }*/
    //console.log(go);
    if (!go) {
        HISTORY.history.splice(HISTORY.cursor+1,  0, file);
        HISTORY.cursor++;
    }
    //console.log('file:', file);
    //console.log(HISTORY.cursor);
    fetch(`${path+file}.md`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
    })
    .then((text) => document.getElementById('content').innerHTML = marked.parse(text))
    .catch((err) => document.getElementById('content').innerHTML = marked.parse(`# :( Ha ocurrido un problema: ${err.message}\n\n> Revise que el archivo _index.md_ se encuentra dentro de la carpeta **data**`));
    //}
};


const anchor = {
    name: 'anchor',
    level: 'inline',
    start(src) {
        return src.match(/^\[\[/)?.index;
    },
    tokenizer(src, tokens) {
        const rule = /^(?:\[\[\s*?)(.*)\s*?\|\s*?(.*)\s*?\]\]/;
        const match = rule.exec(src);
        if (match) {
            return {
                type: 'anchor',
                raw: match[0],
                text: this.lexer.inlineTokens(match[1].trim()),
                file: this.lexer.inlineTokens(match[2].trim())
            }
        }
    },
    renderer(token) {
        return `<a href="#" onclick="loadPage('${this.parser.parseInline(token.file)}')"><span class="octicon octicon-link-external inline-icon"></span>${this.parser.parseInline(token.text)}</a>`;
    }
};



/*const tokenizer = {
    link(href, title, text) {
        const match = src.match(/^\[\[\s*?(.*)\s*?\]\]\(\s*?(.*)\s*?\)$/);
        if (match) {
            return {
                type: 'html',
                raw: match[0],
                text: `<h4><a href="#" class="anchor" onclick="loadPage('${match[2].trim()}')"><span class="octicon octicon-link"></span></a>${match[1].trim()}</h4>`
            };
        }
        return false;
    }
};*/
const renderer = {
    heading(text, level) {
    const match = text.match(/(.*)\{\s*?#(\S*)\s*?\}$/);
    //console.log(match);
    if (match){
        var escapedText = match[2].trim();
        text = match[1].trim();
    }
    else {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    }
    return `
        <h${level}>
            <a name="${escapedText}" class="anchor" href="#${escapedText}" aria-hidden="true">
                <span class="octicon octicon-link"></span>
            </a>
            ${text}
        </h${level}>`;
    },
    image(src, title) {
        const match = src.match(/^https?:\/\//);
        return `<img src="${match?src:'data/'+src}" alt="${title}">`;
    },
    link(href, title, text) {
        const parts = text?text.split('|'):false;
        if (parts.length > 1){
            const part = parts[1].trim();
            let match = part.match(/^(\S*)(?:\s*:(.*):\s*)$/);
            //console.log(part);
            if (match){
                let submatch = href.match(/^!$/);
                if (submatch) {
                    var body = match[2];
                }
            }
            match = part.match(/^\S+/);
            if (match){
                let submatch = part.match(/@/);
                if (submatch) {
                    var cmd = mailto(part, body?body:href);
                }
                else {
                    var cmd = {
                        normal: href,
                        feed: mailto('feedsbot@hispanilandia.net', body?body:href)
                    }[match];
                }
                return `<a href="${cmd}">${parts[0].trim()}</a>`
            }
        }
        else if (!href.match(/^#/)){
            return `<a href="${browser(href)}">${text}</a>`;
        }
        return false;
    }
    /* MAKE: ANALIZAR LINKs PARA ENVIAR A UN BOT DE DELTACHAT 
        [texto | email](href)
        predeterminado para el bot de navegación
        email -> email personalizado
        normal -> trata el enlace como cualquier otro. 
    */
};
marked.use({
    renderer,
    //tokenizer,
    extensions: [anchor]
});

/* MARKEDJS OPTIONS */
marked.setOptions({
    render: new marked.Renderer(),
    highlight: function(code, language) {
        const validLanguage = hljs.getLanguage(language)?language: 'plaintext';
        return hljs.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: true,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

loadPage('index');