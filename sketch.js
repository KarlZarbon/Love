// p5.js sketch that asks the user for an input message
// and render it on the canvas with the 'Love' artwork embedded in it.
// Karl Zarbon Feb 2022

let generator

function setup() {
  createCanvas(640, 660);
  let p = createElement('p', 'Enter your sentence to generate a new image');
  p.position(700, 10);
  let inp = createInput('Love');
  inp.position(700, 50);
  inp.size(300);
  inp.input(myInputEvent);

  checkbox = createCheckbox('wrap', false);
  checkbox.position(700, 80);
  checkbox.changed(myCheckedEvent);

  background(color('#cd120a'));
  textFont('Azeret Mono');
  textSize(16)

  fill(255)
  generator = new LoveGenerator(inp.value())
  generator.generate()

}

function myInputEvent() {

  generator.initMsg(this.value())
  generator.generate()
}

function myCheckedEvent() {
  print('ger')
  generator.setWrap(this.checked())
  generator.init()
  generator.generate()
}

function draw() {
  background(color('#cd120a'));
  let displayMsg = generator.getMessage()

  let endIdx = Math.floor(displayMsg.length / MAXLENGTH)
  for (let i = 0; i < endIdx; i++) {

    let sliceText = displayMsg.slice(i * MAXLENGTH, i * MAXLENGTH + MAXLENGTH)
    text(sliceText, 10, 20 + i * 18)
  }


}