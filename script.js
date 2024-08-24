function locomotiveScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things

ScrollTrigger.scrollerProxy(".main", {

  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"

});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveScroll()

function page1TextAnimation(){
var h1 =document.querySelector("#content-h1 h1");
var h1Text1=h1.textContent;
var splittedText1=h1Text1.split(" ");
let clutter1=""
splittedText1.forEach(function(elem){
  clutter1+=`<span>${elem}</span>`;
})
h1.innerHTML=clutter1;

const tl=gsap.timeline();
tl.from(".content #content-h1 h1 span",{
  y:500,
  rotate:40,
  stagger:.3,
  delay:1,
  
})

tl.from(".heading1 h4,.heading1 span",{
  opacity:0,
  x:-400,
  duration:2
})
}
page1TextAnimation();
function page2TextAnimation(){
  var clutter=""
var h1Text = document.querySelector(".page2 h1").textContent;
var spittedText=h1Text.split("");
spittedText.forEach(function(val){
    clutter+=`<span>${val}</span>`

})
document.querySelector(".page2 h1").innerHTML=clutter;

gsap.to(".page2 h1 span",{
    color:"white",
stagger:.05,

scrollTrigger:{
    trigger:".page2 h1 span",
    scroller:".main",
    // markers:true,
    start:"top bottom",
    end:"bottom top",
    scrub:true,
    
}
})

}
page2TextAnimation()

function canvas(){
  const canvas = document.querySelector(".page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
./frames img/frames00007.png
./frames img/frames00010.png
./frames img/frames00013.png
./frames img/frames00016.png
./frames img/frames00019.png
./frames img/frames00022.png
./frames img/frames00025.png
./frames img/frames00028.png
./frames img/frames00031.png
./frames img/frames00034.png
./frames img/frames00037.png
./frames img/frames00040.png
./frames img/frames00043.png
./frames img/frames00046.png
./frames img/frames00049.png
./frames img/frames00052.png
./frames img/frames00055.png
./frames img/frames00058.png
./frames img/frames00061.png
./frames img/frames00064.png
./frames img/frames00067.png
./frames img/frames00070.png
./frames img/frames00073.png
./frames img/frames00076.png
./frames img/frames00079.png
./frames img/frames00082.png
./frames img/frames00085.png
./frames img/frames00088.png
./frames img/frames00091.png
./frames img/frames00094.png
./frames img/frames00097.png
./frames img/frames00100.png
./frames img/frames00103.png
./frames img/frames00106.png
./frames img/frames00109.png
./frames img/frames00112.png
./frames img/frames00115.png
./frames img/frames00118.png
./frames img/frames00121.png
./frames img/frames00124.png
./frames img/frames00127.png
./frames img/frames00130.png
./frames img/frames00133.png
./frames img/frames00136.png
./frames img/frames00139.png
./frames img/frames00142.png
./frames img/frames00145.png
./frames img/frames00148.png
./frames img/frames00151.png
./frames img/frames00154.png
./frames img/frames00157.png
./frames img/frames00160.png
./frames img/frames00163.png
./frames img/frames00166.png
./frames img/frames00169.png
./frames img/frames00172.png
./frames img/frames00175.png
./frames img/frames00178.png
./frames img/frames00181.png
./frames img/frames00184.png
./frames img/frames00187.png
./frames img/frames00190.png
./frames img/frames00193.png
./frames img/frames00196.png
./frames img/frames00199.png
./frames img/frames00202.png
`;
return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `.page3`,
  start: `top top`,
  end: `250% top`,
  scroller: `.main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: ".page3",
pin: true,
scroller: `.main`,
start: `top top`,
end: `250% top`,
});
}
canvas()

function page4textAnimation(){
  
var clutter2=''
var h1text2 = document.querySelector(".page4 h1").textContent;
var splittedText2 = h1text2.split("");
splittedText2.forEach(function(val){
  clutter2+=`<span>${val}</span>`
})
document.querySelector(".page4 h1").innerHTML=clutter2;

gsap.to(".page4 h1 span",{
  color:"white",
  stagger:.1,
  scrollTrigger:{
    trigger:".page4 h1 span",
    scroller:".main",
    start:"top bottom",
    end:"bottom top",
    scrub:true,
  }
})
}
page4textAnimation();


function canvas2(){
  const canvas = document.querySelector(".page5>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
./bridge img/bridges00004.png
./bridge img/bridges00007.png
./bridge img/bridges00010.png
./bridge img/bridges00013.png
./bridge img/bridges00016.png
./bridge img/bridges00019.png
./bridge img/bridges00022.png
./bridge img/bridges00025.png
./bridge img/bridges00028.png
./bridge img/bridges00031.png
./bridge img/bridges00034.png
./bridge img/bridges00037.png
./bridge img/bridges00040.png
./bridge img/bridges00043.png
./bridge img/bridges00046.png
./bridge img/bridges00049.png
./bridge img/bridges00052.png
./bridge img/bridges00055.png
./bridge img/bridges00058.png
./bridge img/bridges00061.png
./bridge img/bridges00064.png
./bridge img/bridges00067.png
./bridge img/bridges00070.png
./bridge img/bridges00073.png
./bridge img/bridges00076.png
./bridge img/bridges00079.png
./bridge img/bridges00082.png
./bridge img/bridges00085.png
./bridge img/bridges00088.png
./bridge img/bridges00091.png
./bridge img/bridges00094.png
./bridge img/bridges00097.png
./bridge img/bridges00100.png
./bridge img/bridges00103.png
./bridge img/bridges00106.png
./bridge img/bridges00109.png
./bridge img/bridges00112.png
./bridge img/bridges00115.png
./bridge img/bridges00118.png
./bridge img/bridges00121.png
./bridge img/bridges00124.png
./bridge img/bridges00127.png
./bridge img/bridges00130.png
./bridge img/bridges00133.png
./bridge img/bridges00136.png
./bridge img/bridges00139.png
./bridge img/bridges00142.png
./bridge img/bridges00145.png
./bridge img/bridges00148.png
./bridge img/bridges00151.png
./bridge img/bridges00154.png
./bridge img/bridges00157.png
./bridge img/bridges00160.png
./bridge img/bridges00163.png
`;
// ./bridge img/bridges00166.png
// ./bridge img/bridges00169.png
// ./bridge img/bridges00172.png
// ./bridge img/bridges00175.png
// ./bridge img/bridges00178.png
// ./bridge img/bridges00181.png
// ./bridge img/bridges00184.png
// ./bridge img/bridges00187.png
// ./bridge img/bridges00190.png
// ./bridge img/bridges00193.png
// ./bridge img/bridges00196.png
// ./bridge img/bridges00199.png
// ./bridge img/bridges00202.png

return data.split("\n")[index];
}

const frameCount = 53;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `.page5`,
  start: `top top`,
  end: `250% top`,
  scroller: `.main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: ".page5",
pin: true,
scroller: `.main`,
start: `top top`,
end: `250% top`,
});
}
canvas2()

function page6textAnimation(){
  
  var clutter3=''
  var h1text3 = document.querySelector(".page6 h1").textContent;
  var splittedText3 = h1text3.split("");
  splittedText3.forEach(function(val){
    clutter3+=`<span>${val}</span>`
  })
  document.querySelector(".page6 h1").innerHTML=clutter3;
  
  gsap.to(".page6 h1 span",{
    color:"white",
    stagger:.1,
    scrollTrigger:{
      trigger:".page6 h1 span",
      scroller:".main",
      start:"top bottom",
      end:"bottom top",
      scrub:true,
    }
  })
  }
  page6textAnimation();
  
  
function canvas3(){
  const canvas = document.querySelector(".page7>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
`
return data.split("\n")[index];
}

const frameCount = 136;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `.page7`,
  start: `top top`,
  end: `250% top`,
  scroller: `.main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: ".page7",
pin: true,
scroller: `.main`,
start: `top top`,
end: `250% top`,
});
}
canvas3()
  

function circleAnimation(){
  gsap.from(".outer-circle",{
    scale:0,
    scrollTrigger:{
      trigger:".outer-circle",
      scroller:".main",
      start:"top center",
      end:"bottom top",
      scrub:.5,
    }
  })
  
  gsap.from(".inner-circle",{
    scale:0,
    background:"#093DCE",
    scrollTrigger:{
      trigger:".inner-circle",
      scroller:".main",
      start:"top center",
      end:"bottom top",
      scrub:.5,
    }
  })
}
circleAnimation();

function page8TextAnimation(){
  
gsap.to(".page8-bottom h1",{
  transform:"translateY(0px)",
  scrollTrigger:{
    trigger:'.page8-bottom h1',
    scroller:".main",
    // markers:true,
    start:"top 100%",
    end:"bottom 90%",
    scrub:true,
  }
})

gsap.to(".page8-bottom button",{
  transform:"translateY(0px)",
  scrollTrigger:{
    trigger:'.page8-bottom button',
    scroller:".main",
    // markers:true,
    start:"top 100%",
    end:"bottom 90%",
    scrub:true,

  }
})
}
page8TextAnimation();

function loader(){
gsap.from(".loader h1 span",{
  y:500,
  rotate:40,
  stagger:.3,
  delay:1,
  
})

gsap.from(".timer",{
  y:300,
  rotate:40,
  opacity:0,
})
setTimeout(function(){
  
  var a=0;
 const interval = setInterval(function(){

 if(a<100){
a++;
document.querySelector(".timer h1 span").textContent=a;
 }

 },20)
},2000)

 setTimeout(function(){
// document.querySelector(".loader").style.transform=`translate(-130%)`
gsap.to(".loader",{
  transform:`translateY(-130%)`,
  duration:1,
  ease:"linear"
})

 },4700)

}
loader()