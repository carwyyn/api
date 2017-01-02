// CODE FEOM: https://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/


var element = document.documentElement;
  
if(element.scrollHeight > element.clientHeight) {
  // Overflow detected; force scroll bar
  element.style.overflow = 'scrollbar';
} else {
  // No overflow detected; prevent scroll bar
  element.style.overflow = 'hidden';
}