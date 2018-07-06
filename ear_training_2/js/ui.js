
function div(theid=null)
{
  if(theid) this.div = document.getElementById(theid);
  else      this.div = document.createElement('div');
  this.onclick_function=null;
}

div.prototype.append=function(that) { this.div.appendChild(that.div); }
div.prototype.css=function(css) { this.div.className = css; }
div.prototype.add_css=function(css) { this.div.classList.add(css); }
div.prototype.remove_css=function(css) { this.div.classList.remove(css); }
div.prototype.append_to=function(that) { that.div.appendChild(this.div); }
div.prototype.text=function(text) { this.div.innerText = text; }

div.prototype.onclick=function(func)
{
  if(!func) return;
  this.onclick_function = func;
  this.div.addEventListener('click',this.onclick_function);

}

div.prototype.enable_onclick=function() { if(this.onclick_function) this.div.addEventListener('click',this.onclick_function); }
div.prototype.disable_onclick=function() { if(this.onclick_function) this.div.removeEventListener('click',this.onclick_function); }

////////////////////////////////////////////////////////////////////////////

Array.prototype.select_random = function()
{
    return this[Math.floor( Math.random()* this.length) ];
}

Array.prototype.last = function() {
    return this[this.length-1];
}


////////////////////////////////////////////////////////////////////////////

function container()
{
  div.call(this);
  this.css('container container-background container-border container-horizontal margin-1rem padding-1rem');
}
container.prototype = Object.create(div.prototype);

container.prototype.be_vertical=function() { this.remove_css('container-horizontal'); this.add_css('container-vertical'); }
container.prototype.be_horizontal=function() { this.remove_css('container-vertical'); this.add_css('container-horizontal'); }

container.prototype.hide_background=function() { this.remove_css('container-background'); }
container.prototype.hide_border=function() { this.remove_css('container-border'); }

container.prototype.show_background=function() { this.add_css('container-background'); }
container.prototype.show_border=function() { this.add_css('container-border'); }

container.prototype.remove_margin=function() { this.remove_css('margin-1rem'); }
container.prototype.remove_padding=function() { this.remove_css('padding-1rem'); }


container.prototype.be_pure=function() { this.hide_background(); this.hide_border(); this.remove_margin(); this.remove_padding(); }
////////////////////////////////////////////////////////////////////////////


function title(text='')
{
  div.call(this);
  this.css('title');
  this.text (text);
}
title.prototype = Object.create(div.prototype);



function modal(ttl='')
{
  div.call(this);
  this.css('modal');

  this.title = new title(ttl);

  this.modal_container = new container();
  this.modal_container.hide_background();
  this.modal_container.hide_border();
  this.modal_container.remove_margin();
  this.modal_container.be_vertical();

  this.append(this.modal_container);

  this.modal_container.append(this.title);

  this.actions_container = new container();
  this.actions_container.hide_background();
  this.actions_container.hide_border();
  this.actions_container.remove_margin();
  this.actions_container.remove_padding();

  this.modal_container.append(this.actions_container);
}
modal.prototype = Object.create(div.prototype);

modal.prototype.show=function() { this.remove_css('modal-hide'); }
modal.prototype.hide=function() { this.add_css('modal-hide'); }
modal.prototype.append_action=function(btn) { this.actions_container.append(btn); }

////////////////////////////////////////////////////////////////////////////

function button(caption='',onclick=null)
{
  div.call(this);
  this.css('button');
  this.text(caption);

  this.onclick(onclick);
}
button.prototype = Object.create(div.prototype);
button.prototype.enable=function(func) { this.enable_onclick(); this.css('button'); }
button.prototype.disable=function(func) { this.disable_onclick(); this.css('button-disable'); }

button.prototype.onclick_do=function(func)
{
  this.disable_onclick();
  this.onclick(func);
}

///////////////////////////////////////////////////////////////////////////

function light_bubble(caption='',color='info')
{
  div.call(this);
  this.css('light-bubble-off');
  this.text(caption);
  this.color = color;
  this.state = 'off';
}
light_bubble.prototype = Object.create(div.prototype);

light_bubble.prototype.turn_on=function() { this.css('light-bubble-on light-bubble-' + this.color ); this.state='on'; }
light_bubble.prototype.turn_off=function() { this.css('light-bubble-off'); this.state='off'; }
light_bubble.prototype.set_color=function(color) { this.color = color; if(this.state==='on') this.turn_on(); }



//
