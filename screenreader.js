 //press shift+i to invert colors for easier reading
function invertcolor(){
    var css='html {-webkit-filter: invert(100%);'+'-moz-filter: invert(100%);'+'-o-filter: invert(100%);'+'-ms-filter: invert(100%); }',
    head=document.getElementsByTagName('head')[0],
    style=document.createElement('style');
    if(!window.counter){
        window.counter=1;
    }
    else{
        window.counter++;
        if(window.counter%2==0)
        {
            var css='html {-webkit-filter: invert(0%); -moz-filter: invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }'
        }
    }
    style.type='text/css';
    if(style.styleSheet)
    {
        style.styleSheet.cssText=css;
    }
    else{
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    
}

function darken()
{
    window.counter=2;
    invertcolor();
}
//block alt key and use it for myself. since accidental keypress was
function blockaltkeydownEvent()
{
    document.onkeydown=function(e){  
        if(e.altKey) 
        {
             var sel=window.getSelection().toString();
        sel=sel.trim();
        if(sel.charAt(sel.length-1)=='.') 
            sel=sel.substring(0,sel.length-1);
        var txt=subs(sel);
          var prevsr=sr;
        if(event.shiftKey) //if shift key held , read much more slowly
        {
            sr=-1;
        }
        speak(txt);
        sr=prevsr;
            return false;
        }
    }
}
blockaltkeydownEvent();
var adr=window.location.href.toString();
/**
 *the speech rate. varies from -10 to 10. press + key to increase and - to decrease
 */
var sr=2;
//ads("http://localhost:8080/WebApplication2/browserspeak.js?timestamp="+new Date().getTime());
function speak(text)
{
    //new String(;
    dg("speaktext is called")    
    speaktext(text+"<speedofvoice1389867680568>"+sr);
}
//stop the speech if window loses focus
window.onblur=function(){
    speak(" ");
}; 
window.onclose=function(){
    speak(" ");
}; 
window.onunload=function(){
    speak(" ");
}
//window.addEventListener('unload', function() { speak(" ")});
document.onkeypress=handler;
//unset document as editable. for after commenting
//document.body.contentEditable='false';
//document.designMode='off';
//document.spellcheck="false";
document.onkeypress=handler;
//window.removeEventListener("keypress", handler, true);
//window.addEventListener("keypress", handler,true);
var mxl=280;
var mnl=3;
var inf=900; /*infinite loop control */
var rf=1; /*repeat flag*/
/**
 *fraction of window viewport to scroll
 */
var scf=0.45; //fraction of window viewport to scroll
var cef=0;
var blindex=1; //black list index

function ads( src ) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    document.body.appendChild( s );
}
function pt(text)
{
    console.debug(text);  
}

//pressing shift+n will make page content editable , in case it is need to make notes
// then if press shift+s if the webpage is a file:// will be saved.uses an ugly hack, but whatever
function toggleContentEditabillity() {
    if (document.documentElement.contentEditable === false || document.designMode === "off") {
        document.body.contentEditable='true';
        document.designMode='on';
        void 0;
    } else if (document.documentElement.contentEditable === true || document.designMode === "on") {
        document.body.contentEditable='false';
        document.designMode='off';
        void 0;
    }
};       
//substitution pronounciations. hardcoded for now
function subs(inp) 
{           
    var subl=new Array(
        "=>: implies ",
        "+:  plus ",	//1
        "<:  less than ",	//2
        ">:  greater than ",	//3
        "ii: I I",	//4
        "GUI: G U I",	//5
        "Key:kee",	//6
        "toString:too string",	//7
        "\u0398:theeta",	//8
        "n2:n square",	//9
        "log*:log ",	//10
        "\u03b1:alpha",	//11
        "SQLiteDatabase:S Q L lite database"	//12
        ,"a:a"	//13
        ,"href: H ref"	//14
        ,"JavaScript: jaava script "	//15
        ,"\u2190:equal "	//16
        ,"\u222a:union"	//17
        ,"!:!"	//18
        ,"\u03bb:lambda "	//19
        //,"ch : c h "	//20
        ,"ln : log "	//21
        ,"\u2126: omega "	//22
        ," lg: log"	//23
        ,"\u2229: disjunction "	//24
        ,"\u03c3: sigma "	//25
        ,"\u2265: greater or equal to "	//26
        ,"\u2264: less or equal to "	//27
        ,"\u2286: subset of "	//28
        ,"\u2208: belongs to "	//29
        ,"\u2260: not equal to "   	//30
        //,".: dot "                                  //31	
        ,"-: minus "                               //32	
        //,"Y: y "                                        
        ,"/:/"//divided by "                       //33	
        ,"*: into "	//34
        ,"_:  "	//35
        ,"i.e: that is " //37
        ,"//: "	//38
        ," div : d i v "
        ,"C#: c sharp "
        ,"!=:not equal to"
        ,"SQL: S Q L"
        ," div : d i v "
        ,"DIV: d i v "
        ,"\u03b2: beta "
        ,"\u03c1: roh "
        ," wi : w i "
        ,"\u03b3:gamma "
        ,"\u03b4:sigma "
        ,"&: and "
        ,"°:degree"
        //,"-: minus "
        //," f(: f of "
        );
    //list of words that's substitution may not occur if l is pressed. i.e u can choose to sub "minus"
    //for '-' in a sentence but sometimes not(i.e for mathematics expressions)
    var blist=new Array(2,3,31-1,32-1);           
    //var sl = subs.split("##");
    //alert(subl[32]);
    for (var i = 0; i < subl.length; i++) {
        try {
                    
            if(blindex==1)
            { 
                var brf=0;
                for(var j=0;j<blist.length;j++)
                { 
                    if(blist[j]==i)
                        brf=1;  
                }
                if(brf==1) { //alert("i= "+i); 
                {  //alert(" breaking at index "+i+" string is "+subl[i]); 
                    continue;
                }
                }
            } 
            var olds = subl[i].split(":")[0];
            var news = subl[i].split(":")[1];
            // alert("olds =" + olds + " news=" + news);
            inp = inp.split(olds).join(news);
        //throw new exception("he he he");
        //alert(inp);
        } catch (err) {
        //    alert(err);
        // Logger.getLogger(screenreaderfinal.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    //alert("here");
    return inp;
}
    //KEYMAP
    var ns=47,ps=46; //not used for now
    
    var pw="[",nw="]";//move backword/forward by one word   
    var np="'",pp=";",rep=32,cef=78; //next punctuation , previous punctuation
    var pss="m",nss=",",ss=13; //next system sentence and previous system sentence   
    var ppg=".",npg="/";//previous paragraph and next paragraph , not used in heat map
    
    var blist=108,invertcol=105; //invert colors
    var su=61,sd=45;
    var gotostart=92;
    var sav=83;
    var prevlink=111,nextlink=112;//used in specific webpages. is hardcoded for now
    
function handler(event)
{
    
	//don't process keypress if meant for something else
	if(event.target==null || event.target==document.body)
	;
	else
	return;
    var kc=(event.keyCode) ? event.keyCode : event.which;
    var ks=String.fromCharCode(kc);
    console.debug("string:"+ks+" keycode:"+kc);
    if(ks==pw)
    {
        mbw();
        store(ks);
    }
    else if(ks==nw)
    {
        mfw();
        store(ks);
    }
    else if(ks==pss)    // m for prev sentence
    { 
        if(window.getSelection().toString().length<1)
            return;
        mbss(); 
        store(ks);
    }
    else if(ks==nss) // , for next sentence 
    {   //alert("called n");
        if(window.getSelection().toString().length<1)
            return;
        mfss(); 
        store(ks);
    //mfl();
    }

    else if(ks==ppg)    // . for prev paragraph
    { //mbss(); 
        if(window.getSelection().toString().length<1)
            return;
       var sel=window.getSelection();
	sel.modify("move","backward","character");
	sel.modify("extend","backward","paragraph");	
     store(ks);
    }

    else if(ks==npg) // / for next paragraph
    { 
        if(window.getSelection().toString().length<1)
            return;
	var sel=window.getSelection();
	sel.modify("move","forward","character");
	sel.modify("extend","forward","paragraph");	
        store(ks);
        //mfss(); 
    }

    	
    else if(ks==pp) //; for prev punctuation
    {
        
        
    //mbb(30);
    mbc([':',';','.','\n','('], 2, 300)
    store(ks);
    }
    else if(ks==np) // ' for next punctuation
    {
        
    mfc([':',';','.','\n',')'], 2, 300)
    store(ks);
    }
    
    if((kc==105 || kc==73) &&event.shiftKey==true) // keycode
    {
        //alert("called"); 
        //console.debug("got before invertcolor");
        invertcolor();
        return;
    //return false;
    }

    if((kc==cef+32 || kc==cef) &&event.shiftKey==true)
    {
        toggleContentEditabillity();
        return;
    }
    
    if((kc==sav || kc==sav+32) && event.shiftKey) //shift + s statement.sends keypresses to chrome to save the 
    //page
        {
            //alert("got ctrl + s");
            //return;
              speaktext("<systemcommand1390993666293>"+window.location.href+"</systemcommand1390993666293>");          
              console.debug("came here");
              event.stopPropagation();
              return;
        }
    
    if(window.getSelection().toString().length<1)
        return;
    
    if(kc==gotostart)
    {
        speak(" ");
        if(window.getSelection().toString().length<9)
        {
            mbl();
            mbl();
            return;
        }
        else
        {
            mbl();
            return;
        }
    }

    if(kc==su) //speech rate up
    {
        sr= sr<10?sr+1:10;
        //console.debug("speech rate is "+sr);
    //return;
    }
    if(kc==sd) //speech rate down
    {
        sr= sr>-10?sr-1:-10;
        //console.debug("speech rate is "+sr);
    //return;
    }

    var url=document.URL.toString();

    if(kc==blist)
    {
        if(blindex==0){
            blindex=1; /*alert("on");*/
        }
        else                     {
            blindex=0; /*alert("off");*/
        }
    //return false;    
    }
    
    else if(ks==ss) //stop speaking
    {
        speak(" ");  
        return;
    }
    
    else if(kc==32)  // space for repeat
    {
        //mvis();
        //alert("called");
        var sel=window.getSelection().toString();
        sel=sel.trim();
        if(sel.charAt(sel.length-1)=='.') 
            sel=sel.substring(0,sel.length-1);
        var txt=subs(sel);
        var prevsr=sr;
        if(event.shiftKey)
        {
            sr=0
        }
        speak(txt);
        sr=prevsr;
        if(window.getSelection().toString().length>0)
            event.returnValue=false;
        return;
    //return false;
    }

    if(true)//kc==ps||kc==ns||kc==pl||kc==nl||kc==rep||kc==pss||kc==nss||kc==ss) //nl and pl have been modified for next and previous blocks
    {
        
        //make selection visible
        mvis();
        //alert("called");
        var sel=window.getSelection().toString();
        sel=sel.trim();
        if(sel.charAt(sel.length-1)=='.') 
            sel=sel.substring(0,sel.length-1);
        var txt=subs(sel);
        speak(txt);
        if(navigator.userAgent.toString().indexOf("Mozilla")!=-1)
            event.handled=false;
       
    //return false;
    }
//alert("got here");
//return false;
}
var ctr=10;
//so this function stores all the state info
var str=[]; //this string array stores all the info
var sidx=0; //this stores index of last stored entries
function store(ks) 
{
    if(ctr==0) //take a snapshot of selection if counter reaches 0 and push to storage
    {
      var ptob=_xpath.createXPathRangeFromRange(window.getSelection().getRangeAt(0));
      var pts=JSON.stringify(ptob);
      str.push(pts);
      
    }
    str.push(ks);
    ctr=10 ? ctr<0 : ctr--;
    
}

if (!String.prototype.startsWith) {
  (function() {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
    var defineProperty = (function() {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var toString = {}.toString;
    var startsWith = function(search) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      if (search && toString.call(search) == '[object RegExp]') {
        throw TypeError();
      }
      var stringLength = string.length;
      var searchString = String(search);
      var searchLength = searchString.length;
      var position = arguments.length > 1 ? arguments[1] : undefined;
      // `ToInteger`
      var pos = position ? Number(position) : 0;
      if (pos != pos) { // better `isNaN`
        pos = 0;
      }
      var start = Math.min(Math.max(pos, 0), stringLength);
      // Avoid the `indexOf` call if no match is possible
      if (searchLength + start > stringLength) {
        return false;
      }
      var index = -1;
      while (++index < searchLength) {
        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
          return false;
        }
      }
      return true;
    };
    if (defineProperty) {
      defineProperty(String.prototype, 'startsWith', {
        'value': startsWith,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.startsWith = startsWith;
    }
  }());
}

	if (!String.prototype.endsWith) {
  (function() {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
    var defineProperty = (function() {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var toString = {}.toString;
    var endsWith = function(search) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      if (search && toString.call(search) == '[object RegExp]') {
        throw TypeError();
      }
      var stringLength = string.length;
      var searchString = String(search);
      var searchLength = searchString.length;
      var pos = stringLength;
      if (arguments.length > 1) {
        var position = arguments[1];
        if (position !== undefined) {
          // `ToInteger`
          pos = position ? Number(position) : 0;
          if (pos != pos) { // better `isNaN`
            pos = 0;
          }
        }
      }
      var end = Math.min(Math.max(pos, 0), stringLength);
      var start = end - searchLength;
      if (start < 0) {
        return false;
      }
      var index = -1;
      while (++index < searchLength) {
        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
          return false;
        }
      }
      return true;
    };
    if (defineProperty) {
      defineProperty(String.prototype, 'endsWith', {
        'value': endsWith,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.endsWith = endsWith;
    }
  }());
}


function mfw()
{
    var sel=window.getSelection();   
    sel.modify("move","forward","character");
    sel.modify("extend","forward","word");  
}
/**
 *move backword by word
 **/
function mbw()
{
    var sel=window.getSelection();   
    sel.modify("move","backward","character");
    sel.modify("extend","backward","word");  
}

function dg(txt)
{
    console.debug(txt);  
}

function send(txt)
{
    var res=new String();
    for(var i=0;i<txt.length;i++)
    {
        res+=" "+txt.charCodeAt(i);    
    }
    alert("len is "+txt.length+" txt:"+res);    
     
}   

/**
 *move forward by using system functions by one sentence
 */
function mfss()
{
    var sel = window.getSelection(); 
    sel.modify("move","forward","character");
    sel.modify("extend","forward","sentence");
    
    sel = window.getSelection(); 
    if(sel.toString().length<mnl)
        mfss();
}
/**
 * move backward by using system functions by one sentence
 */
function mbss()
{
    var sel = window.getSelection(); 
    sel.modify("move","backward","character");
    sel.modify("extend","backward","sentence");

    sel=window.getSelection();
    if(sel.toString().length<mnl)
        mbss();
    
}

/**
 * move forward by using system functions by one line
 */

function mfsl()
{
    var sel = window.getSelection(); 
    sel.modify("move","forward","character");
    sel.modify("extend","forward","line");
    
    sel = window.getSelection(); 
    if(sel.toString().length<mnl)
        mfss();
}
/**
 * move backward by using system functions by one line
 */
function mbsl()
{
    var sel = window.getSelection(); 
    sel.modify("move","backward","character");
    sel.modify("extend","backward","line");

    sel=window.getSelection();
    if(sel.toString().length<mnl)
        mbss();
    
}
/**
 * gets height of the selected area
 **/
function geth()
{
    var sel=window.getSelection();
    var rc=sel.getRangeAt(0).getBoundingClientRect();
    return rc.height;
}
/**
 * move forward by line
 * 
 */

function mfl()
{
    var selection = window.getSelection(); 
    selection.modify("move","forward","character");
    var ct=0;
    replist="";
    while(true)
    {
        ct++;
        if(ct>=inf)
        { 
            break; /*end of document */
        }
        var h1=geth();
        ecf();
        var h2=geth();
        if(h2>h1 && h1!=0)
        {
            // console.clear();
            console.debug("height difference h1="+h1+" h2 = "+h2);
            var str=window.getSelection().toString();
            str=str.trim();
            replist+="####"+str;
                
            // console.debug("\ntext to replace is ->"+txt+"<-");
            console.debug("list so far is ->"+replist+"<-");
                
        }
        var txt=window.getSelection().toString();
        var ch=txt.charAt(txt.length-1);
        if(txt.length>mxl)
        {
            break;
        }
      
        if(ch=="\n" && txt.length>mnl)
        {//alert("break on newline"); break;}
            break;
        }
        if(ch=='.')
        {   /*extend and see if the next char is space(next sentence then) */ 
            //alert("dot detected");
            var h1=geth();
            ecf();
            var h2=geth();
            if(txt.length<mnl)
                continue;
            if(h2>h1 && h1!=0)
                break;
            var txt=window.getSelection().toString();
            var prevch=txt.charAt(txt.length-1);
                 
            if(prevch==" " || prevch=="\""|| txt.charCodeAt(txt.length-1)==10)
            {  
                break;
            }
            else
            {
                continue;
            }
        }
    }
}
function ecf()
{
   
    var sel=window.getSelection();
    sel.modify("extend","forward","character");
}
function ecb()
{
    var sel=window.getSelection();
    sel.modify("extend","backward","character");
}

/**move back block
 * function to simply traverse large blocks
 */
function mbb(lim)
{
    var selection=window.getSelection();
    //selection.modify("move","backward","character");
 
    //ecf();
    //mfb(lim);
    for(var i=0;i<lim;i++)
    {
        selection.modify("move","backward","line");
    //selection.modify("move","backward","sentence");
    //selection.modify("extend","backward","word");    
    }
    mfb(lim); 
}

/**move forward block
 * function to simply traverse large blocks
 */
function mfb(lim)
{
    var selection=window.getSelection();
    selection.modify("move","forward","character");
    //selection.modify("extend","forward","sentence");
    for(var i=0;i<lim;i++)
    {
        //     ecf();
        selection.modify("extend","forward","sentence");    
    }
    
}



function mbl()
{
    var selection = window.getSelection(); 
    selection.modify("move","backward","character");
    var ct=0;
    while(true)
    {
        ct++;
        if(ct>=inf)
        { 
                
            break; /*end of document */
        }
         
        ecb();
        var txt=window.getSelection().toString();
        var ch=txt.charAt(0);
        if(txt.length>mxl)
            break;
        
        if(ch=="\n" && txt.length>mnl)
            break;
        
        if(ch=='.')
        { 
            /*ecb(); //no need for it */
            if(txt.length<mnl)
                continue;
                 
            var txt=window.getSelection().toString();
            var ch=txt.charAt(1);
            if(ch==" " || txt.charCodeAt(1)==10)
            {  
                break;
            }
            else
            {
                continue;
            }
 
            break;
        }
    }
}

function cts(ar,st)
{
st=st.trim();
for(var i=0;i<ar.length;i++)
{
if(st.indexOf(ar[i])!=-1)
return true;
}
return false;
}


/**
 *delim-char,min-length,max-length
 *move backward upto character array specified
 */
function mbc(ppa,min,max)
{
	ppa=[';',':','.','(',')',',','\n','?'];
    min=4; max=300;
    var selection = window.getSelection(); 
    selection.modify("move","backward","character");
    var ct=0;
    while(true)
    {
        ct++;
        if(ct>=inf)
        { 
                
            break; /*end of document */
        }
         
        ecb();
        var txt=window.getSelection().toString();
        var fch=txt.charAt(0);
        if(txt.length>max)
            break;
	    console.log(cts(ppa,txt));
        if(ppa.indexOf(fch)!=-1 && txt.length>min)
        {
               
            break;
        }
    }
}
/** 
 *delim-char,min-length,max-length
 *move forward upto character array specified
 */
function mfc(npa,min,max)
{
	npa=[';',':','.','(',')',',','\n','?'];
	min=3; max=300;
	console.log("npa is "+npa);
    var selection = window.getSelection(); 
    selection.modify("move","forward","character");
    var ct=0;
    while(true)
    {
        ct++;
        if(ct>=inf)
        { 
                
            break; /*end of document */
        }
         
        ecf();
        var txt=window.getSelection().toString();
        var fch=txt.charAt(txt.length-1);
        if(txt.length>max)
            break;
        console.log(cts(npa,txt));
        if(npa.indexOf(fch)!=-1 && txt.length >min)
        { 

            break;
        }
    }
}   


/**
 * make the current selection visible. that is move up/down with the selection
 */

function mvis()  
{
      var scf=0.3;
    var ele=window.getSelection().getRangeAt(0);        
    var sel = ele.getBoundingClientRect();               
    var dw  = document.documentElement.clientWidth;     
    var dh = document.documentElement.clientHeight;       
    dw=window.innerWidth;
    dh=window.innerHeight;
    var st=sel.top;
    var sb=sel.bottom;
    var db=dh; 
    var dt=0;
    var amt=0;
    if(st<0)     //too much up
    {
        //alert("st<0");
        amt=-1*dh*scf;//341 dh*scf; 
    }
    if(sb>db) //too much down
    {
        //alert("sb>db");
        amt=dh*scf; //341;    
    }
    window.scrollBy(0, amt);
     console.log(sel.top+" " +sel.right+" "+sel.bottom+" "+ sel.left+"\n"+dw+" "+dh+" amt= "+amt);        
	 console.error("scroll value "+amt);	 
	if(amt>500) 
        console.debug("scroll value too much "+amt);
}



