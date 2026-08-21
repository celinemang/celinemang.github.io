document.addEventListener("DOMContentLoaded",()=>{
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 const fades=document.querySelectorAll(".fade-in");
 if(!reduced) fades.forEach((el,index)=>el.style.setProperty("transition-delay",`${Math.min(index%4,3)*70}ms`));
 if(reduced||!("IntersectionObserver" in window)) fades.forEach(el=>el.classList.add("visible"));
 else{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:"0px 0px -30px"});fades.forEach(el=>observer.observe(el))}
 document.querySelectorAll(".stacked-gallery").forEach(gallery=>{
  const images=[...gallery.querySelectorAll(".gallery-img")];let current=0;
  gallery.setAttribute("role","button");gallery.setAttribute("tabindex","0");gallery.setAttribute("aria-label","Cycle through project screenshots");
  const update=()=>images.forEach((image,index)=>{const offset=(index-current+images.length)%images.length;image.className="gallery-img";image.classList.add(offset===0?"stack-0":offset===1?"stack-1":offset===2?"stack-2":"stack-hide");image.setAttribute("aria-hidden",offset===0?"false":"true")});
  const advance=()=>{current=(current+1)%images.length;update()};gallery.addEventListener("click",advance);gallery.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();advance()}});update();
 })
});
let previousFocus=null;
function togglePhotography(){const overlay=document.getElementById("photo-modal-overlay");if(!overlay)return;const opening=!overlay.classList.contains("open");overlay.classList.toggle("open",opening);overlay.setAttribute("aria-hidden",String(!opening));document.body.style.overflow=opening?"hidden":"";if(opening){previousFocus=document.activeElement;overlay.querySelector(".photo-modal-close")?.focus()}else previousFocus?.focus()}
function closePhotographyModal(event){if(event.target.id==="photo-modal-overlay")togglePhotography()}
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&document.getElementById("photo-modal-overlay")?.classList.contains("open"))togglePhotography()});
